import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const WithDrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    loadEarningsData();
  }, []);

  const loadEarningsData = async () => {
    try {
      const response = await axios.get(
        `${server}/shop/get-seller-earnings`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setEarningsData(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading earnings data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    try {
      const response = await axios.put(
        `${server}/shop/update-payment-methods`,
        { withdrawMethod },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Withdraw method added successfully!");
        setPaymentMethod(false);
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating payment method");
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting withdraw method");
    }
  };

  const withdrawHandler = async () => {
    const balance = earningsData?.availableBalance || 0;
    
    if (withdrawAmount < 50 || withdrawAmount > balance) {
      toast.error("Invalid withdrawal amount!");
      return;
    }

    try {
      const response = await axios.post(
        `${server}/withdraw/create-withdraw-request`,
        { amount: withdrawAmount },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Withdrawal request created successfully!");
        loadEarningsData(); // Reload earnings data after withdrawal
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating withdrawal request");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <p>Loading earnings data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex flex-col items-center p-8">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          <h2 className="text-[24px] font-semibold mb-4">Earnings Overview</h2>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="text-[18px] font-medium mb-2">Available Balance</h3>
              <p className="text-[24px] font-bold text-blue-600">
                ${earningsData?.availableBalance?.toFixed(2) || "0.00"}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h3 className="text-[18px] font-medium mb-2">Total Earnings</h3>
              <p className="text-[24px] font-bold text-green-600">
                ${earningsData?.totalEarnings?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>

          <div
            className={`${styles.button} text-white !h-[42px] !rounded`}
            onClick={() => (Number(earningsData?.availableBalance) < 50 ? toast.error("Minimum withdrawal amount is $50") : setOpen(true))}
          >
            Withdraw Money
          </div>

          {earningsData?.recentTransactions?.length > 0 && (
            <div className="w-full mt-8">
              <h3 className="text-[20px] font-semibold mb-4">Recent Transactions</h3>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Order ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsData.recentTransactions.map((transaction, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            transaction.status === "Credited" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-2">{transaction.orderId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add New Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your bank name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankInfo.bankCountry}
                      required
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankCountry: e.target.value })
                      }
                      placeholder="Enter your bank country"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankSwiftCode: e.target.value })
                      }
                      placeholder="Enter bank swift code"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankAccountNumber: e.target.value })
                      }
                      placeholder="Enter bank account number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankHolderName: e.target.value })
                      }
                      placeholder="Enter bank holder name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankAddress: e.target.value })
                      }
                      placeholder="Enter bank address"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} !h-[42px] !rounded text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdrawal Methods:
                </h3>

                {seller?.withdrawMethod ? (
                  <div className="mt-4">
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="space-y-2">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            String(seller.withdrawMethod.bankAccountNumber).length - 3
                          ) +
                            String(seller.withdrawMethod.bankAccountNumber).slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller.withdrawMethod.bankName}</h5>
                      </div>
                      <div
                        className={`${styles.button} !bg-red-500 !rounded !h-[42px]`}
                        onClick={deleteHandler}
                      >
                        <span className="text-white">Delete</span>
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: ${earningsData?.availableBalance?.toFixed(2)}</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-full border pl-2 py-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] !rounded text-white ml-3`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No withdrawal method available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} !h-[42px] !rounded text-white mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawMoney;