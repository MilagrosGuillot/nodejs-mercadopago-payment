import mercadopage from "mercadopago";
import { MERCADOPAGO_TOKEN } from "../config.js";

export const createOrder = async (req, res) => {
    mercadopage.configure({
        access_token: MERCADOPAGO_TOKEN,
    });

    const result = await mercadopage.preferences.create({
        items: [
            {
                title: "Laptop",
                unit_price: 500,
                currency_id: "ARG",
                quantity: 1,
            },
        ],
        notification_url: "https://ab6b-24-232-22-62.ngrok-free.app/webhook",
        back_urls: {
            success: "http://localhost:3000/success",
            // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
            // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
        }
    });

    console.log(result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);

}
export const receiveWebhook = async (req, res) => {
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
            const data = await mercadopage.payment.findById(payment["data.id"]);
            console.log(data);
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
};