import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye, FaDownload } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  useGetAllMoneyReceiptsQuery,
  useMoveRecycledMoneyReceiptMutation,
} from "../../../redux/api/money-receipt";
import { Pagination } from "@mui/material";
import Loading from "../../../components/Loading/Loading";

const MoneyReceiptTable = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const limit = 10;
  const navigate = useNavigate();
  const textInputRef = useRef(null);
  const tenantDomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    if (search) {
      setFilterType(search);
    }
  }, [search]);

  const { data: allMoneyReceipts, isLoading: moneyReceiptLoading } =
    useGetAllMoneyReceiptsQuery({
      tenantDomain,
      limit,
      page: currentPage,
      searchTerm: filterType,
      isRecycled: false,
    });

  const [
    moveRecycledMoneyReceipt,
    { isLoading: deleteLoading, error: deleteError },
  ] = useMoveRecycledMoneyReceiptMutation();

  const handleIconPreview = async (e) => {
    navigate(`/dashboard/money-receipt-view?id=${e}`);
  };

  const handleMoveRecycledbin = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: " You want to move  this Money Receipt Recycle Bin?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await moveRecycledMoneyReceipt({ tenantDomain, id }).unwrap();
        swal(
          "Move to Recycle bin!",
          "Move to Recycle bin successful.",
          "success"
        );
      } catch (error) {
        swal("Error", "An error occurred while deleting the card.", "error");
      }
    }
  };

  useEffect(() => {
    if (search) {
      setFilterType(search);
    }
  }, [search]);

  if (moneyReceiptLoading) {
    return <Loading />;
  }

  if (deleteError) {
    toast.error(deleteError?.message);
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex-wrap flex items-center justify-between mb-5 bg-[#F1F3F6] py-5 px-3">
        <h3 className="mb-3 text-xl font-bold md:text-3xl">
          Money Receipt List:
        </h3>
        <div className="flex items-center searcList">
          <div className="searchGroup">
            <input
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              autoComplete="off"
              type="text"
              ref={textInputRef}
              placeholder="Write here..."
            />
          </div>
          <button className="SearchBtn">Search</button>
        </div>
      </div>

      <section className="tableContainer overflow-x-auto">
        <table className="customTable">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Received with thanks from</th>
              <th>Final Payment against bill no</th>
              <th>Total Amount</th>
              <th>Advance Service Bill</th>
              <th>Due Service Bill</th>
              <th>Date</th>
              <th colSpan={4}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allMoneyReceipts?.data?.moneyReceipts?.map((card, index) => {
              const serialNumber = (currentPage - 1) * limit + index + 1;

              return (
                <tr
                  key={card._id}
                  className={`${
                    card.paymentColor === "#2dce89"
                      ? "bg-[#2dce89] text-white"
                      : card.paymentColor === "#f5365c"
                      ? "bg-[#f5365c] text-white"
                      : card.paymentColor === "#ffad46"
                      ? "bg-[#ffad46] text-black"
                      : ""
                  } transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-black`}
                >
                  <td>{serialNumber}</td>
                  <td>{card.thanks_from}</td>
                  <td>{card.job_no}</td>
                  <td>{card.total_amount}</td>
                  <td>{card.advance || 0}</td>
                  <td>{card.remaining}</td>
                  <td>
                    {card.default_date !== "NaN-NaN-NaN"
                      ? card.default_date
                      : card.check_date}
                  </td>
                  <td>
                    <div
                      onClick={() => handleIconPreview(card._id)}
                      className="editIconWrap edit2"
                    >
                      <FaEye className="editIcon" />
                    </div>
                  </td>
                  <td>
                    <a
                      className="editIconWrap edit2"
                      href={`${
                        import.meta.env.VITE_API_URL
                      }/money-receipts/money/${card._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaDownload className="editIcon" />
                    </a>
                  </td>
                  <td>
                    <div className="editIconWrap edit">
                      <Link
                        to={`/dashboard/money-receipt-update?id=${card._id}`}
                      >
                        <FaEdit className="editIcon" />
                      </Link>
                    </div>
                  </td>
                  <td>
                    <button
                      disabled={deleteLoading}
                      onClick={() => handleMoveRecycledbin(card._id)}
                      className="editIconWrap"
                    >
                      <FaTrashAlt className="deleteIcon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <Pagination
            count={allMoneyReceipts?.data?.meta?.totalPages}
            page={currentPage}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </div>
  );
};

export default MoneyReceiptTable;
