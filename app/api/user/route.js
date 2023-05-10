import { NextResponse } from "next/server";

// export async function GET(request) {
//     return new Response ({
//         status: 200,
//         message: 'Hello from Femi tosin',
//         url: request.url
//     })
// }

export async function GET(request) {
    const response = {
        status: 200,
        message: 'Hello from Femi tosin',
        url: request.url
    };

    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
