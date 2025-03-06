import { test, expect } from "@playwright/test";
import { log } from "console";
import bookingReqBody from "../../testData/post_req_data.json";

// write test
test("Create Post req testing using static json file", async ({ request }) => {
  const postAPIResponse = await request.post(`/booking`, {
    data: bookingReqBody
});

  const postAPIResponseBody = await postAPIResponse.json();
  log(postAPIResponseBody);

  // validate status code
  expect(postAPIResponse.ok).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // validate json api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Raja");
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Yadav");
  // validate nested json objects
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01"
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01"
  );
});

// create post api req
