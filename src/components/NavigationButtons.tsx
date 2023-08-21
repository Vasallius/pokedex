import { BiHomeAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
export function NavigationButtons({ id }: { id: number }) {
  return (
    <div className="flex items-center gap-8">
      <Link to="/">
        <button className="btn text-white normal-case font-primary bg-[#3e7dca]">
          <BiHomeAlt2 /> Home
        </button>
      </Link>
      <Link to={`/${id === 1 ? id : id - 1}`}>
        <button className="btn text-white normal-case font-primary bg-[#3e7dca]">
          Previous
        </button>
      </Link>
      <Link to={`/${id === 1010 ? id : id + 1}`}>
        <button className="btn text-white normal-case font-primary bg-[#3e7dca]">
          Next
        </button>
      </Link>
    </div>
  );
}
