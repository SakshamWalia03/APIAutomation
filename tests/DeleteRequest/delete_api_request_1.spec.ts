import { test, expect } from "@playwright/test";
import  postRequest from "../../testData/post_request_body.json";
import tokenRequest from "../../testData/token_request_body.json";
import putRequest from "../../testData/put_request_body.json";


test("Create DELETE api request in playwright", async ({ request }) => {
  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: postRequest,
  });

  const bookingId = await postAPIResponse.json();
  const bId = bookingId.bookingid;

  // create GET api request using playwright
  const getAPIResponse = await request.get("/booking/", {
    params: {
      firstname: "testers talk playwright",
      lastname: "testers talk api testing",
    },
  });

  // validate status code
  console.log(await getAPIResponse.json());
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);

  // generate token
  const tokenAPIResponse = await request.post("/auth", {
    data: tokenRequest,
  });
  expect(tokenAPIResponse.ok()).toBeTruthy();
  expect(tokenAPIResponse.status()).toBe(200);

  console.log(await tokenAPIResponse.json());
  const tokenResponseBody = await tokenAPIResponse.json();
  const tokenNo = tokenResponseBody.token;

  // partial update booking details
  const patchAPIResponse = await request.patch(`/booking/${bId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${tokenNo}`,
    },
    data: {
      firstname: "testers talk postman",
      lastname: "testers talk rest assured",
    },
  });

  console.log(await patchAPIResponse.json());
  expect(patchAPIResponse.ok()).toBeTruthy();
  expect(patchAPIResponse.status()).toBe(200);

  // DELETE api request
  // partial update booking details
  const deleteAPIResponse = await request.delete(`/booking/${bId}`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${tokenNo}`,
    },
  });
  expect(deleteAPIResponse.status()).toBe(201);
  expect(deleteAPIResponse.statusText()).toBe("Created");
});