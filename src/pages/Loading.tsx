
import s from '../assets/s.gif';

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <img
        src={s}
        alt='Loading...'
        className='w-1/3 h-auto' 
      />
    </div>
  );
};

export default Loading;
