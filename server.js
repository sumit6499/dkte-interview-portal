import express  from 'express';
import Razorpay  from 'razorpay';
import cors from 'cors';
const app = express();
const port = 3000;

const razorpay = new Razorpay({
  key_id: 'rzp_test_F6j4fjoQXNFwPB',
  key_secret: 'O08MJgzR31S7egRP6t0FtlOf',
});
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend origin
}));
// Route to create a Razorpay order
app.post('/createOrder', async (req, res) => {
  const amount = 50000; // Amount in paisa (10000 paisa = ₹100)
  const currency = 'INR';

  const options = {
    amount,
    currency,
    receipt: 'order_receipt',
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
