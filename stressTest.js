import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 225,
  duration: "30s"
};

export default function () {
  http.get("http://localhost:3002/api/checkout/product/5");
};

