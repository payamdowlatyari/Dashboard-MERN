import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import { useDispatch } from 'react-redux';
import {
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
  signOut,
} from '../../../redux/reducers/clientSlice';
import { profileUpdate, signOutClinet } from '../../../api'; 
import {Button} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';


export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentClient, loading, error } = useSelector((state) => state.client);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateClientStart());
      const res = await profileUpdate(currentClient._id, formData);
      console.log(res)
      if (res.status !== 201) {
        dispatch(updateClientFailure(res.data));
        return;
      }
      dispatch(updateClientSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateClientFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutClinet();
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='main'>
      <div className="card">
            <Card title="Profile">

      <form onSubmit={handleSubmit}>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
      {/* <Avatar 
      image={formData.profilePicture || currentClient.profilePicture}
      onClick={() => fileRef.current.click()}
      alt='profile'
      className="mr-2" 
      size="xlarge" 
      shape="circle" 
      /> */}
        <p className='p-messages'>
          {imageError ? (
          <Message severity="error" text="Error uploading image (file size must be less than 2 MB)!" />
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
          <Message severity="success" text="Image uploaded successfully!" />
          ) : (
            ''
          )}
        </p>
        <InputText
          defaultValue={currentClient.username}
          type='text'
          id='username'
          placeholder='Username'
          className="p-inputtext-sm"
          onChange={handleChange}
        />
        <InputText
          defaultValue={currentClient.email}
          type='email'
          id='email'
          placeholder='Email'
          className="p-inputtext-sm"
          onChange={handleChange}
        />
        <InputText
          type='password'
          id='password'
          placeholder='Password'
          className="p-inputtext-sm"
          onChange={handleChange}
        />
        <Button 
          severity='success'
          label={loading ? 'Loading...' : 'Update'} 
          size="small"
          text raised
          />
      </form>
        <Button 
          onClick={handleSignOut} 
          severity="danger"
          label={loading ? 'Loading...' : 'Sign Out'} 
          size="small"
          text raised
        />  
        <div className='p-messages'>
        {error && <Message severity="error" text="Something went wrong!" />}
        {updateSuccess && <Message severity="success" text="User is updated successfully!" />}
        </div>
        </Card>
        </div>
    </div>
  );
}
