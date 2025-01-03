import { getLevel } from "../data/levels";

const PasswordHintImage = ({ currentLevel }: { currentLevel: number }) => {
  const level = getLevel(currentLevel);
  const imgSrc = level.imgSrc;
  const imgAlt = level.imgAlt;
  return (
    <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
      <img
        aria-live="polite"
        className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        src={imgSrc}
        alt={imgAlt}
      />
    </div>
  );
};

export default PasswordHintImage;
