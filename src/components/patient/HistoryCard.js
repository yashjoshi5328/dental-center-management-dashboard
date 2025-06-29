import { formatDateTime } from "../../utils/format";

const HistoryCard = ({ data , onClick }) => {
    const {id, title, appointmentDate}=data;

    return (
    <div
      className="bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff] p-3 h-18 flex justify-between items-center shadow-2xl rounded-xl mb-2 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="font-sans text-sm">{formatDateTime(appointmentDate)}</p>
      </div>
      <div className="font-extrabold text-2xl">{'>'}</div>
    </div>
  );
};

export default HistoryCard;
