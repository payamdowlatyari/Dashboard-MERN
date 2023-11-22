export default function Footer(){
    return (
        <div className='footer text-700'>
            <a className="text-primary" href='https://www.payamd.com'>payamd.com</a> © {new Date().getFullYear()}
        </div>
    );
}