// const express = require('express');
// const cors = require('cors');
// // const multer = require('multer');
// // const nodemailer = require('nodemailer');
// // const csvParser = require('csv-parser');
// // const fs = require('fs');
// // const emailTemplates = require('./email/emailTamplate');
// // const emailConfig = require('./email/email')
// // const xlsx = require('xlsx');
// const routes = require('./routes');
// const http = require('http');

// const { dbConnect } = require("./db");
// const app = express();

// const { Server } = require("socket.io");

// app.use(cors());
// app.use(express.json());

// // const upload = multer({ dest: 'uploads/' });


// // // Function to parse CSV files
// // async function parseCSV(csvPath, recipients) {
// //     return new Promise((resolve, reject) => {
// //         fs.createReadStream(csvPath)
// //             .pipe(csvParser())
// //             .on('data', (row) => {
// //                 console.log('Row data:', row); // Log the row to inspect its structure
// //                 if (row.email) {
// //                     recipients.push(row.email);  // Push email if it exists in the 'email' column
// //                 }
// //             })
// //             .on('end', () => {
// //                 resolve(); // Resolve once CSV parsing is complete
// //             })
// //             .on('error', (err) => {
// //                 reject(err); // Reject if there is an error parsing the file
// //             });
// //     });
// // }


// // // Function to parse Excel files
// // async function parseExcel(excelPath, recipients) {
// //     const workbook = xlsx.readFile(excelPath);
// //     const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
// //     const data = xlsx.utils.sheet_to_json(sheet);

// //     data.forEach((row) => {
// //         if (row.email) {
// //             recipients.push(row.email); // Push email if it exists in the row
// //         }
// //     });
// // }


// // // Route to handle email sending
// // app.post('/api/send-emails', upload.single('csvFile'), async (req, res) => {
// //     try {


// //         const { template, recipientsCount } = req.body;
// //         const csvPath = req.file.path;

// //         const recipients = [];


// //         const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

// //         if (fileExtension === 'csv') {
// //             // Parse CSV file
// //             await parseCSV(csvPath, recipients);
// //         } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
// //             // Parse Excel file
// //             await parseExcel(csvPath, recipients);
// //         } else {
// //             return res.status(400).send('Invalid file format. Please upload a CSV or Excel file.');
// //         }



// //         // console.log(`Parsed CSV. Total recipients: ${recipients.length}`);
// //         // console.log("Recipients:", recipients);  // Displaying the recipients array in console



// //         // Send the bulk emails asynchronously
// //         await sendBulkEmails(recipients, template, recipientsCount);

// //         res.send('Emails sent successfully');
// //     } catch (err) {
// //         console.error('Error processing email sending:', err);
// //         res.status(500).send('Error sending emails: ' + err.message);
// //     }
// // });

// // // Function to send emails
// // async function sendBulkEmails(recipients, template, recipientsCount) {
// //     try {
// //         // console.log(recipients)

// //         const transporter = nodemailer.createTransport(emailConfig);


// //         let mailOptions = emailTemplates.sendEmailTemplate(recipients, template, recipientsCount);


// //         const info = await transporter.sendMail(mailOptions);
// //         console.log(`Email sent: ${info.response}`);
// //     } catch (e) {
// //         console.log("some error", e);

// //     }
// // }


// // app.use('/api', routes);
// // dbConnect();




// const server = http.createServer();
// server.listen(8080);

// // app.listen(8080, () => {
// //     console.log('Server is running on http://localhost:8080');
// // });





// //////////////////////////////////////////////////////////////////////////////////////////






// // const express = require('express');
// // const fs = require('fs');
// // const axios = require('axios');
// // const crypto = require('crypto');
// // const path = require('path');  // Added for file path handling

// // const app = express();
// // app.use(express.json());



// // const verifyWebhook = (webhookData, hmacHeader, secret) => {
// //     const hash = crypto.createHmac('sha256', secret).update(webhookData).digest('base64');
// //     return hash === hmacHeader;
// // };

// // const removeCommas = (str) => {
// //     return str.replace(/,/g, '');
// // };


// // const KBorder = async (req, res) => {
// //     console.log("test");

// //     try {
// //         // const hmacHeader = req.get('x-shopify-hmac-sha256');
// //         // const webhookData = JSON.stringify(req.body);

// //         // console.log(hmacHeader)
// //         // console.log(webhookData)
// //         // const secret = 'f687252db7314ccdf2a0ea3f08b5de81c0687ea832410646fc6cfc9f0c806481'; // Replace with your actual secret key
// //         // const verified = verifyWebhook(webhookData, hmacHeader, secret);

// //         // if (!hmacHeader || !verified) {
// //         //     console.error("kostaboda - Invalid Webhook Signature.");
// //         //     return res.status(400).send('Invalid Webhook Signature');
// //         // }

// //         // const getOrderData = req.body;
// //         // // console.log(getOrderData)
// //         // const orderId = getOrderData.id || null;
// //         // console.log(orderId, "dsjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

// //         // if (!orderId) {
// //         //     console.error("kostaboda - Order ID is missing.");
// //         //     return res.status(400).send('Order ID is missing');
// //         // }
// //          const SHOPIFY_API_URL = `https://amjad-itgeeks.myshopify.com/admin/api/2025-01/orders/7243070898374.json`;

// //         // Fetch order using REST API
// //         const response = await fetch(SHOPIFY_API_URL, {
// //             method: 'GET',
// //             headers: {
// //                 'X-Shopify-Access-Token': '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', // Replace with your actual token
// //             }
// //         });

// //         // Check if response is successful
// //         if (!response.ok) {
// //             console.error(`Failed to fetch order: ${response.status} - ${response.statusText}`);
// //             return res.status(response.status).send('Failed to fetch order details');
// //         }

// //         const order = await response.json();
// //         console.log(order)
// //         if (!order) {
// //             console.error("kostaboda - Failed to fetch order details from REST API.");
// //             return res.status(400).send('Failed to fetch order details');
// //         }




// //         const orderName = order.name || '';
// //         let noteMsg = order.note || '';
// //         let giftWrapperData = '';
// //         let giftWrapperStatus = false;

// //         if (order.line_items) {
// //             order?.line_items?.forEach(item => {
// //                 if (item.properties) {
// //                     item?.properties?.forEach(property => {
// //                         if (property.name === '_gift_wrapper' && property.value === 'true') {
// //                             giftWrapperStatus = true;
// //                             if (item.sku) {
// //                                 giftWrapperData += `${item.sku} Gift Wrap `;
// //                             }
// //                         }
// //                     });
// //                 }
// //             });
// //         }

// //         noteMsg += ` ${giftWrapperData}`;

// //         // Discount calculation
// //         const totalDiscount = parseFloat(order.total_discounts || 0);
// //         let discountPerItem = 0;

// //         if (totalDiscount >= 0) {
// //             const lineItemCount = order?.line_items?.length;
// //             discountPerItem = (totalDiscount / lineItemCount).toFixed(2);
// //         }

// //         // Shipping Code Mapping
// //         const shippingCodeMap = {
// //             '2nd Day': 'SC',
// //             'Overnight': 'ND',
// //             'Ground': 'SI',
// //         };
// //         const shopifyShippingCode = order.shipping_lines?.[0]?.code || '';
// //         const shippingCode = shippingCodeMap[shopifyShippingCode] || '';

// //         // Prepare CSV data
// //         const file = `order-${orderName}.csv`;
// //         let csvContent = '';

// //         // Order Data
// //         const orderData = [
// //             "H", orderName, 'RL',
// //             '0C7C3FBEC04B491E946EB325DB8374DA',
// //             order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : '',
// //             parseFloat(order.total_price || 0).toFixed(2), '0', '0', '0', '0', '0',
// //             parseFloat(order.total_price || 0).toFixed(2),
// //             order.billing_address?.last_name || '',
// //             order.billing_address?.first_name || '',
// //             removeCommas(order.billing_address?.address1 || ''),
// //             removeCommas(order.billing_address?.address2 || ''),
// //             order.billing_address?.city || '',
// //             order.billing_address?.province_code || '',
// //             order.billing_address?.zip || '',
// //             order.billing_address?.country_code || '',
// //             order.email || '',
// //             order.billing_address?.phone || '',
// //             order.shipping_address?.last_name || '',
// //             order.shipping_address?.first_name || '',
// //             removeCommas(order.shipping_address?.address1 || ''),
// //             removeCommas(order.shipping_address?.address2 || ''),
// //             order.shipping_address?.city || '',
// //             order.shipping_address?.province_code || '',
// //             order.shipping_address?.zip || '',
// //             order.shipping_address?.country_code || '',
// //             order.email || '',
// //             order.shipping_address?.phone || '',
// //             removeCommas(noteMsg),
// //         ];
// //         csvContent += orderData.join(',') + '\n';

// //         // Shipping Data
// //         const shippingData = [
// //             'D', 'ret-hd', 'ret-hd', '-', 'Shipping', '1',
// //             parseFloat(order.total_shipping_price_set?.shop_money?.amount || 0).toFixed(2),
// //             parseFloat(order.total_shipping_price_set?.shop_money?.amount || 0).toFixed(2),
// //             '', '', '', '0',
// //             shippingCode, '0'
// //         ];
// //         csvContent += shippingData.join(',') + '\n';

// //         // Tax Data
// //         const taxData = [
// //             'D', 'ret-tax', 'ret-tax', '-', 'Tax', '1',
// //             parseFloat(order.total_tax || 0).toFixed(2),
// //             parseFloat(order.total_tax || 0).toFixed(2),
// //             '', '', '', '0',
// //             shippingCode, '0'
// //         ];
// //         csvContent += taxData.join(',') + '\n';

// //         // Line Item Data
// //         order?.line_items?.forEach(item => {
// //             const sku = item.sku || '';
// //             const name = removeCommas(item.name || '');
// //             const qty = parseInt(item.quantity || 0, 10);
// //             const retailPrice = parseFloat(removeCommas(item.price || 0));

// //             // Calculate discount
// //             const oneItemDiscount = (discountPerItem / qty).toFixed(2);
// //             const price = (retailPrice - oneItemDiscount).toFixed(2);
// //             const totalLinePrice = (price * qty).toFixed(2);

// //             const lineItemData = [
// //                 'D', sku, sku, '-',
// //                 name, qty, price, totalLinePrice, '', '', '', '0',
// //                 shippingCode, '0'
// //             ];
// //             csvContent += lineItemData.join(',') + '\n';
// //         });

// //         // Write the CSV file to the server
// //         const filePath = path.join(__dirname, 'downloads', file); // Specify the directory where you want to store the file

// //         // Ensure the "downloads" directory exists
// //         if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
// //             fs.mkdirSync(path.join(__dirname, 'downloads'));
// //         }

// //         fs.writeFileSync(filePath, csvContent);

// //         console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
// //         // Send the file for download
// //         res.download(filePath, file, (err) => {
// //             if (err) {
// //                 console.error("Error sending file for download:", err);
// //                 res.status(500).send('Error downloading the file.');
// //             }
// //         });
// //     } catch (err) {
// //         console.error('Webhook processing error in Kostaboda store:', err);
// //         res.status(500).send('Internal Server Error');
// //     }
// // };








// // app.post('/order-create', express.raw({ type: 'application/json' }), KBorder);







// // const port = 3000;
// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// // });







////////////////////////////////
const { Server } = require("socket.io");
const http = require('http');

const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ['GET', 'POST']
    }
});
const allRooms = io.sockets.adapter.rooms;

io.on("connection", (socket) => {
    console.log("connection established successfully!", socket.id);
    socket.on("chat-message", async (sender, reciever, message) => {
        console.log(sender, reciever, "messaged :", message);
        let roomName = reciever + sender;
        if (allRooms.has(roomName)) {
            console.log("room already exist");
            socket.join(roomName);
            socket.to(roomName).emit("chat-message",sender, reciever, message);
            console.log("sended messsage to client")

        }
        else {
            socket.join(sender + reciever);
            console.log("room not exist creating one ");
            socket.to(sender + reciever).emit("chat-message",sender, reciever, message);
            console.log("sended messsage to client")
        }


    });



});


httpServer.listen(8080);




