import gym from '../../images/gym.jpg';

export default function SignUp({ children }) {
  return (
    <div className="container block min-h-full h-full z-10">
      <div className="absolute z-0 top-0 bottom-0 left-0 right-0 opacity-30">
        <img className="object-cover h-screen min-w-full" src={gym} alt="gym" />
      </div>
      <div className="h-full flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden w-[500px] shadow-lg min-h-[660px] relative z-10">
          <div className="w-full px-16 py-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
