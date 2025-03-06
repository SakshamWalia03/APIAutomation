import { test, expect } from "@playwright/test";
import { log } from "console";
import { stringFormat } from "../../utils/common";
import bookingReqBody from "../../testData/post_request_body.json";

// write test
test("Create Post req testing using dynamic json file", async ({ request }) => {
  const dynamicReqBody = stringFormat(
    JSON.stringify(bookingReqBody),
    "Rachin",
    "Ravindra",
    "Lost iPhone"
  );

  const postAPIResponse = await request.post(`/booking`, {
    data: JSON.parse(dynamicReqBody)
  });

  const postAPIResponseBody = await postAPIResponse.json();
  log(postAPIResponseBody);

  // validate status code
  expect(postAPIResponse.ok).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // validate json api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Rachin");
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Ravindra");
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
