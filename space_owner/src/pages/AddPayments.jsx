import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiPlus, FiX, FiEdit, FiCheck, FiTrash2 } from 'react-icons/fi';

const AddPayments = () => {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      provider: 'Visa',
      lastFour: '4242',
      expiry: '12/24',
      isPrimary: true
    },
    {
      id: 2,
      type: 'credit_card',
      provider: 'Mastercard',
      lastFour: '8888',
      expiry: '09/25',
      isPrimary: false
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit_card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    zipCode: '',
    isPrimary: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.cardNumber.length < 16) {
      alert('Please enter a valid card number');
      return;
    }

    const lastFour = newPaymentMethod.cardNumber.slice(-4);
    const provider = detectCardProvider(newPaymentMethod.cardNumber);
    
    const newMethod = {
      id: Date.now(),
      type: newPaymentMethod.type,
      provider,
      lastFour,
      expiry: newPaymentMethod.expiry,
      isPrimary: newPaymentMethod.isPrimary
    };

    setPaymentMethods(prev => {
      if (newMethod.isPrimary) {
        return [newMethod, ...prev.map(p => ({ ...p, isPrimary: false }))];
      }
      return [newMethod, ...prev];
    });

    setIsAddingPayment(false);
    setNewPaymentMethod({
      type: 'credit_card',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      zipCode: '',
      isPrimary: false
    });
  };

  const detectCardProvider = (cardNumber) => {
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber)) return 'Mastercard';
    if (/^3[47]/.test(cardNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
    return 'Card';
  };

  const setAsPrimary = (id) => {
    setPaymentMethods(prev => 
      prev.map(p => ({
        ...p,
        isPrimary: p.id === id
      }))
    );
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const exp = value.replace(/\D/g, '').substring(0, 4);
    if (exp.length > 2) {
      return `${exp.substring(0, 2)}/${exp.substring(2)}`;
    }
    return exp;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FiCreditCard className="mr-3 text-blue-500" />
          Payment Methods
        </h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {paymentMethods.filter(p => p.isPrimary).length > 0 ? 'Primary' : 'Add Payment'}
        </span>
      </div>

      <div className="space-y-6">
        {/* Existing Payment Methods */}
        {paymentMethods.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
                  <FiCreditCard className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{payment.provider} ending in {payment.lastFour}</h3>
                  <p className="text-gray-600">Expires {payment.expiry}</p>
                </div>
              </div>
              {payment.isPrimary ? (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  Primary
                </span>
              ) : null}
            </div>

            <div className="flex justify-end space-x-3">
              {!payment.isPrimary && (
                <button 
                  onClick={() => setAsPrimary(payment.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Make Primary
                </button>
              )}
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <FiEdit className="inline mr-1" /> Edit
              </button>
              <button 
                onClick={() => deletePaymentMethod(payment.id)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <FiTrash2 className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add Payment Method Button */}
        {!isAddingPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 transition-colors"
            onClick={() => setIsAddingPayment(true)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-3 rounded-lg mr-4">
                  <FiPlus className="text-xl text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Add Payment Method</h3>
                  <p className="text-gray-600">Credit card or bank account</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Add New
              </button>
            </div>
          </motion.div>
        )}

        {/* Add Payment Method Form */}
        <AnimatePresence>
          {isAddingPayment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-blue-300 rounded-xl p-5 bg-blue-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Add New Payment Method</h3>
                <button 
                  onClick={() => setIsAddingPayment(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formatCardNumber(newPaymentMethod.cardNumber)}
                    onChange={(e) => {
                      e.target.value = formatCardNumber(e.target.value);
                      handleInputChange(e);
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formatExpiry(newPaymentMethod.expiry)}
                      onChange={(e) => {
                        e.target.value = formatExpiry(e.target.value);
                        handleInputChange(e);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={newPaymentMethod.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPaymentMethod.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={newPaymentMethod.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPrimary"
                    name="isPrimary"
                    checked={newPaymentMethod.isPrimary}
                    onChange={(e) => setNewPaymentMethod(prev => ({
                      ...prev,
                      isPrimary: e.target.checked
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-700">
                    Set as primary payment method
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={() => setIsAddingPayment(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddPaymentMethod}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <FiCheck className="mr-2" />
                    Add Payment Method
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payout History */}
        <div className="pt-4">
          <h3 className="font-medium text-gray-800 mb-3">Payout History</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <div className="font-medium text-gray-800">August Payout</div>
                <div className="text-sm text-gray-600">Aug 15, 2023</div>
              </div>
              <div className="text-green-600 font-bold">$9,450.00</div>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <div className="font-medium text-gray-800">July Payout</div>
                <div className="text-sm text-gray-600">Jul 15, 2023</div>
              </div>
              <div className="text-green-600 font-bold">$8,720.00</div>
            </div>

            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-medium text-gray-800">June Payout</div>
                <div className="text-sm text-gray-600">Jun 15, 2023</div>
              </div>
              <div className="text-green-600 font-bold">$7,980.00</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddPayments;