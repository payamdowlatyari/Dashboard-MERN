
export const getPosts = () => async (dispatch) => {

    try {
        // const { data } = await api.fetchPosts();
        const res = await fetch('/api/project', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          });
          const data = await res.json();
          if (data.success === true) 
            return data;
        // dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

// try {
//     dispatch(signInStart());
//     const res = await fetch('/api/auth/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     if (data.success === false) {
//       dispatch(signInFailure(data));
//       return;
//     }
//     dispatch(signInSuccess(data));
//     navigate('/');
//   } catch (error) {
//     dispatch(signInFailure(error));
//   }

// export const createPost = (post) => async (dispatch) => {
//     try {
//         const { data } = await api.createPost(post)
//         dispatch({ type: 'CREATE', payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const updatePost = (id, post) => async (dispatch) => {
//     try {
//         const { data } = await api.updatePost(id, post)
//         dispatch({ type: 'UPDATE', payload: data });
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const deletePost = (id) => async (dispatch) => {
//     try {
//         await api.deletePost(id);
//         dispatch({ type: 'DELETE', payload: id });
//     } catch (error) {
//         console.log(error.message);
//     }
// }