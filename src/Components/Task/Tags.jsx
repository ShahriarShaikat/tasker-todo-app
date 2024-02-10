import getRandomColor from "../../utils/Priority";

export default function Tags({ tags }) {
  return (
    <ul className="flex justify-center gap-1.5 flex-wrap">
      {tags.map((tag, index) => (
        <li key={index}>
          <span
            style={{ backgroundColor: getRandomColor() }}
            className="inline-block h-5 whitespace-nowrap rounded-[45px]  px-2.5 text-sm capitalize text-[#F4F5F6]"
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
