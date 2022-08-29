export default function ButtonRound({size, hoverColor, children, onClick}) {
  return (
    <button
      className={'flex justify-center items-center rounded-full p-2.5' +
      {sm: ' h-8 w-8', md: ' h-10 w-10', lg: ' h-12 w-12'}[size] +
      ' hover:bg-[#fff4]'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
