import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useRef, useEffect, createContext, useState, useContext, useCallback } from "react";
import moment from "moment";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateToken = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
class DB {
  constructor() {
    this.countries = {
      115: {
        name: "Туреччина",
        id: "115",
        flag: "https://flagcdn.com/w40/tr.png"
      },
      43: {
        name: "Єгипет",
        id: "43",
        flag: "https://flagcdn.com/w40/eg.png"
      },
      34: {
        name: "Греція",
        id: "34",
        flag: "https://flagcdn.com/w40/gr.png"
      }
    };
    this.cities = {
      712: {
        countryId: "43",
        id: 712,
        name: "Хургада"
      },
      1262: {
        id: 1262,
        name: "Макаді Бей",
        countryId: "43"
      },
      1247: {
        id: 1247,
        name: "Марса Алам",
        countryId: "43"
      },
      953: {
        id: 953,
        name: "Аланія",
        countryId: "115"
      }
    };
    this.hotels = {
      7953: {
        id: 7953,
        name: "Marlin Inn Azur Resort",
        img: "https://newimg.otpusk.com/2/400x300/00/03/97/88/3978846.webp",
        cityId: 712,
        cityName: "Хургада",
        countryId: "43",
        countryName: "Єгипет"
      },
      18183: {
        id: 18183,
        name: "Albatros Makadi Resort",
        img: "https://newimg.otpusk.com/2/400x300/00/04/88/41/4884132.webp",
        cityId: 1262,
        cityName: "Макаді Бей",
        countryId: "43",
        countryName: "Єгипет"
      },
      84183: {
        id: 84183,
        name: "Protels Beach Club & SPA",
        img: "https://newimg.otpusk.com/2/400x300/00/03/95/62/3956278.webp",
        cityId: 1247,
        cityName: "Марса Алам",
        countryId: "43",
        countryName: "Єгипет"
      },
      7898: {
        id: 7898,
        name: "Saphir Hotel & Villas",
        img: "https://newimg.otpusk.com/2/400x300/00/04/37/33/4373386.webp",
        cityId: 953,
        cityName: "Аланія",
        countryId: "115",
        countryName: "Туреччина"
      }
    };
    this.searches = /* @__PURE__ */ new Map();
  }
  getCountries = () => {
    return this.countries;
  };
  getCities = () => {
    return this.cities;
  };
  getHotel = (hotelID) => {
    const [, hotel] = Object.entries(this.getHotels()).find(([, hotel2]) => hotel2.id === hotelID) ?? [];
    if (hotel) {
      const description = "Готель розташований на березі моря. Готель заснований у 1990 році, остання реновація проведена у 2016 році. Затишна зелена територія, комфортабельні номери. Поруч із готелем знаходиться гарна дискотека. Підійде для молоді та сімей з дітьми.";
      const services = {
        wifi: "yes",
        aquapark: "none",
        tennis_court: "yes",
        laundry: "yes",
        parking: "yes"
      };
      return { ...hotel, description, services };
    }
    return {};
  };
  getHotels = () => {
    return this.hotels;
  };
  getHotelsByCountryID = (countryID) => {
    return Object.fromEntries(
      Object.entries(this.getHotels()).filter(([, hotel]) => hotel.countryId === countryID)
    );
  };
  addSearch = (token, search) => {
    this.searches.set(token, search);
  };
  deleteSearch = (token) => {
    this.searches.delete(token);
  };
  hasSearch = (token) => {
    return this.searches.has(token);
  };
  getSearch = (token) => {
    return this.searches.get(token) ?? null;
  };
}
class Price {
  static futureDate(daysFromNow) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split("T")[0];
  }
  static generate() {
    const amount = randomInt(1500, 4e3);
    const startOffset = randomInt(2, 5);
    const startDate = this.futureDate(startOffset);
    const endDate = this.futureDate(startOffset + randomInt(4, 7));
    return {
      id: generateToken(),
      amount,
      currency: "usd",
      startDate,
      endDate
    };
  }
}
class Search {
  constructor(token, params = {}) {
    this._token = token;
    this._params = params;
    this.readyTimestamp = this._setReadyTimestamp();
  }
  _setReadyTimestamp = () => {
    const getFutureTimestamp = (offsetSeconds) => {
      const now = Date.now();
      return now + offsetSeconds * 1e3;
    };
    return getFutureTimestamp(randomInt(2, 4));
  };
  get isReady() {
    return Date.now() >= this.readyTimestamp;
  }
  getMockPrices(db2) {
    const hotels = db2.getHotelsByCountryID(this._params.countryID);
    return Object.fromEntries(
      Object.entries(hotels).map(([hotelID]) => {
        const price = Price.generate();
        return [price.id, Object.assign(price, { hotelID })];
      })
    );
  }
}
const db = new DB();
const getCountries = () => {
  const countries = db.getCountries();
  const response = new Response(JSON.stringify(countries), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const searchGeo = (string) => {
  const addType = (type) => (entity) => ({ ...entity, type });
  const countries = Object.values(db.getCountries()).map(addType("country"));
  const hotels = Object.values(db.getHotels()).map(addType("hotel"));
  const cities = Object.values(db.getCities()).map(addType("city"));
  let geo = {};
  switch (string?.length) {
    case 2: {
      const [country] = countries;
      const [hotelA, hotelB] = hotels;
      geo[country.id] = country;
      geo[hotelA.id] = hotelA;
      geo[hotelB.id] = hotelB;
      break;
    }
    case 3: {
      const [, , hotelA, hotelB] = hotels;
      const [cityA, cityB] = cities;
      geo[hotelA.id] = hotelA;
      geo[hotelB.id] = hotelB;
      geo[cityA.id] = cityA;
      geo[cityB.id] = cityB;
      break;
    }
    case 4: {
      break;
    }
    default: {
      const [, country] = countries;
      const [, , cityA, cityB] = cities;
      const [hotelA] = hotels;
      geo[cityA.id] = cityA;
      geo[cityB.id] = cityB;
      geo[country.id] = country;
      geo[hotelA.id] = hotelA;
    }
  }
  const response = new Response(JSON.stringify(geo), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const startSearchPrices = (countryID) => {
  if (!countryID) {
    const error = {
      code: 400,
      error: true,
      message: "Country id is required param."
    };
    const response2 = new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Promise.reject(response2);
  }
  const token = generateToken();
  const search = new Search(token, { countryID });
  db.addSearch(token, search);
  const body = {
    token,
    waitUntil: new Date(search.readyTimestamp).toISOString()
  };
  const response = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const getSearchPrices = (token) => {
  const search = db.getSearch(token);
  if (!search) {
    const error = {
      code: 404,
      error: true,
      message: "Search with this token was not found."
    };
    const response2 = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Promise.reject(response2);
  }
  if (!search.isReady) {
    const error = {
      code: 425,
      error: true,
      message: "Search results are not ready yet. Please try again later.",
      waitUntil: new Date(search.readyTimestamp).toISOString()
    };
    const response2 = new Response(JSON.stringify(error), {
      status: 425,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Promise.reject(response2);
  }
  const prices = search.getMockPrices(db);
  const response = new Response(JSON.stringify({ prices }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const stopSearchPrices = (token) => {
  if (!token || !db.hasSearch(token)) {
    const error = {
      code: 404,
      error: true,
      message: "Search with this token was not found."
    };
    const response2 = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Promise.reject(response2);
  }
  db.deleteSearch(token);
  const body = {
    message: "Search has been cancelled successfully."
  };
  const response = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const getHotels = (countryID) => {
  const hotels = db.getHotelsByCountryID(countryID);
  const response = new Response(JSON.stringify(hotels), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const getHotel = (hotelId) => {
  const hotel = db.getHotel(hotelId);
  if (!hotel) {
    const error = {
      code: 404,
      error: true,
      message: "Hotel with this ID was not found."
    };
    const resp = new Response(JSON.stringify(error), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
    return Promise.reject(resp);
  }
  const response = new Response(JSON.stringify(hotel), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const getPrice = (priceId) => {
  if (!priceId) {
    const error = {
      code: 404,
      error: true,
      message: "Offer with this ID was not found."
    };
    const response2 = new Response(JSON.stringify(error), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return Promise.reject(response2);
  }
  const price = Object.assign(Price.generate(), { id: priceId });
  const response = new Response(JSON.stringify(price), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return Promise.resolve(response);
};
const useOutsideClick = (callback) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);
  return ref;
};
function CloseIconSvg() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "24", height: "24", fill: "white" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7 17L16.8995 7.10051",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M7 7.00001L16.8995 16.8995",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function CityIconSvg$1() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "#000000",
      width: "30px",
      height: "20px",
      viewBox: "0 0 50 50",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      children: /* @__PURE__ */ jsx("path", { d: "M15 5 A 1.0001 1.0001 0 0 0 14 6L14 25L7 25 A 1.0001 1.0001 0 0 0 6 26L6 29.716797L0.048828125 43.605469 A 1.0001 1.0001 0 0 0 0.96679688 45L49.140625 45 A 1.0001 1.0001 0 0 0 50.046875 43.576172L44 30.621094L44 22 A 1.0001 1.0001 0 0 0 43 21L37 21L37 14 A 1.0001 1.0001 0 0 0 36 13L29 13L29 6 A 1.0001 1.0001 0 0 0 28 5L15 5 z M 16 7L27 7L27 13L23 13 A 1.0001 1.0001 0 0 0 22 14L22 25L16 25L16 7 z M 18 9L18 11L20 11L20 9L18 9 z M 23 9L23 11L25 11L25 9L23 9 z M 18 13L18 15L20 15L20 13L18 13 z M 24 15L35 15L35 21L31 21 A 1.0001 1.0001 0 0 0 30 22L30 39L24 39L24 26L24 15 z M 18 17L18 19L20 19L20 17L18 17 z M 26 17L26 19L28 19L28 17L26 17 z M 31 17L31 19L33 19L33 17L31 17 z M 18 21L18 23L20 23L20 21L18 21 z M 26 21L26 23L28 23L28 21L26 21 z M 32 23L42 23L42 39L34 39L32 39L32 23 z M 26 25L26 27L28 27L28 25L26 25 z M 34 25L34 27L36 27L36 25L34 25 z M 38 25L38 27L40 27L40 25L38 25 z M 8 27L22 27L22 39L8 39L8 27 z M 10 29L10 31L12 31L12 29L10 29 z M 14 29L14 31L16 31L16 29L14 29 z M 18 29L18 31L20 31L20 29L18 29 z M 26 29L26 31L28 31L28 29L26 29 z M 34 29L34 31L36 31L36 29L34 29 z M 38 29L38 31L40 31L40 29L38 29 z M 10 33L10 35L12 35L12 33L10 33 z M 14 33L14 35L16 35L16 33L14 33 z M 18 33L18 35L20 35L20 33L18 33 z M 26 33L26 35L28 35L28 33L26 33 z M 34 33L34 35L36 35L36 33L34 33 z M 38 33L38 35L40 35L40 33L38 33 z M 6 34.796875L6 40 A 1.0001 1.0001 0 0 0 7 41L23 41L34 41L43 41 A 1.0001 1.0001 0 0 0 44 40L44 35.349609L47.570312 43L2.484375 43L6 34.796875 z" })
    }
  );
}
async function fetchWithRetry(url, setError, setIsLoading, retries = 2, delay = 1e3) {
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await url;
    if (!response.ok) {
      if (retries === 0 && setError) setError(`Server error: ${response.status}`);
      throw new Error(`Server error: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      if (setIsLoading) setIsLoading(true);
      console.warn(`Retrying fetch for ${url}. Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (setError) setError("");
      return fetchWithRetry(url, setError, setIsLoading, retries - 1, delay * 2);
    }
    throw error;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}
function TextError({ error }) {
  return /* @__PURE__ */ jsx("span", { className: "text-error", children: error });
}
function Spinner() {
  return /* @__PURE__ */ jsx("div", { className: "loader" });
}
const HotelsContext = createContext(null);
const HotelsContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  return /* @__PURE__ */ jsx(HotelsContext.Provider, { value: { hotels, setHotels }, children });
};
const OffersContext = createContext(null);
const OffersContextProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  return /* @__PURE__ */ jsx(OffersContext.Provider, { value: { offers, setOffers }, children });
};
function DropdownInput({
  countries,
  placeholder,
  selectedPlaces,
  setSelectedPlaces,
  inputText,
  setInputText,
  places,
  searchResponse,
  setSearchResponse
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(HotelsContext);
  const offersContext = useContext(OffersContext);
  if (!context || !offersContext) {
    throw new Error(
      `Context must be used within a ${!context ? "HotelsContext" : "OffersContext"}`
    );
  }
  const { offers, setOffers } = offersContext;
  const { hotels, setHotels } = context;
  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);
  });
  const handleSelect = (country) => {
    setSelectedPlaces(country);
    setInputText(country.name);
    setIsOpen(false);
  };
  const handleGetHotels = useCallback(() => {
    if (selectedPlaces.type === "country")
      fetchWithRetry(getHotels(selectedPlaces.id)).then(async (resp) => {
        const data = await resp.json();
        if (Object.values(data).length > 0 && !hotels.map((item) => item.countryId).includes(+(selectedPlaces?.id ?? 0))) {
          setHotels([
            ...hotels,
            {
              countryId: +selectedPlaces.id,
              hotels: Object.values(data)
            }
          ]);
        }
        return;
      });
  }, [selectedPlaces]);
  const stopSearch = async () => {
    await fetchWithRetry(stopSearchPrices(searchResponse.token), setError, setIsLoading).finally(
      () => setSearchResponse({
        token: "",
        waitUntil: null
      })
    );
  };
  const handleSubmit = (event) => {
    if (searchResponse.token) stopSearch();
    setError("");
    setSearchResponse({
      ...searchResponse,
      waitUntil: null
    });
    event.preventDefault();
    if (selectedPlaces) {
      fetchWithRetry(startSearchPrices(selectedPlaces.id), setError, setIsLoading).then((resp) => {
        if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
        return resp.json();
      }).then((data) => setSearchResponse(data));
      setOffers([]);
      handleGetHotels();
    }
  };
  return /* @__PURE__ */ jsxs("form", { className: "dropdown", onSubmit: (event) => handleSubmit(event), children: [
    /* @__PURE__ */ jsx("span", { className: "dropdown-title", children: placeholder }),
    /* @__PURE__ */ jsxs("div", { className: "dropdown-header", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "inputText",
          type: "text",
          className: "dropdown-header__input",
          value: inputText,
          placeholder,
          onChange: (event) => {
            setInputText(event.target.value);
            setSelectedPlaces(null);
          },
          onClick: () => {
            if (inputText === placeholder) setInputText("");
            setIsOpen(true);
          },
          ref: inputRef
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "dropdown-header__button",
          onClick: () => {
            if (inputRef.current) inputRef.current.focus();
            setInputText("");
            setSelectedPlaces(null);
            setIsOpen(true);
          },
          children: /* @__PURE__ */ jsx(CloseIconSvg, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { ref: dropdownRef, children: isOpen && /* @__PURE__ */ jsx("ul", { className: "dropdown-menu", children: inputText.length === 0 || selectedPlaces && selectedPlaces.type === "country" ? countries.map((country) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "dropdown-item",
        onClick: () => handleSelect({
          ...country,
          type: "country"
        }),
        children: [
          /* @__PURE__ */ jsx("img", { src: country.flag, className: "dropdown-item__image" }),
          /* @__PURE__ */ jsx("span", { children: country.name })
        ]
      },
      country.id
    )) : places.map((place) => /* @__PURE__ */ jsxs("li", { className: "dropdown-item", onClick: () => handleSelect(place), children: [
      place.type === "city" ? /* @__PURE__ */ jsx(CityIconSvg$1, {}) : /* @__PURE__ */ jsx(
        "img",
        {
          src: place.type === "country" ? place.flag : place.img,
          className: "dropdown-item__image"
        }
      ),
      /* @__PURE__ */ jsx("span", { children: place.name })
    ] }, place.id)) }) }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "dropdown-button", disabled: !selectedPlaces || isLoading, children: isLoading ? /* @__PURE__ */ jsx(Spinner, {}) : "Знайти" }),
    error.length > 0 && /* @__PURE__ */ jsx(TextError, { error })
  ] });
}
const SearchResultsContext = createContext(null);
const SearchResultsContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);
  return /* @__PURE__ */ jsx(SearchResultsContext.Provider, { value: { searchResults, setSearchResults }, children });
};
function Offer({ item }) {
  return /* @__PURE__ */ jsxs("div", { className: "offer", children: [
    item.hotel?.img && /* @__PURE__ */ jsx("img", { src: item.hotel.img, className: "offer-image", loading: "lazy" }),
    /* @__PURE__ */ jsx("span", { className: "offer-title", children: item.hotel?.name }),
    /* @__PURE__ */ jsxs("span", { className: "offer-address", children: [
      item.hotel?.countryName,
      ", ",
      item.hotel?.cityName
    ] }),
    /* @__PURE__ */ jsx("span", { className: "offer-start", children: "Старт тура" }),
    /* @__PURE__ */ jsx("span", { className: "offer-date", children: moment(item.priceOffer?.startDate, "YYYY-MM-DD").format("DD.MM.YYYY") }),
    /* @__PURE__ */ jsxs("span", { className: "offer-amout", children: [
      item.priceOffer?.amount && new Intl.NumberFormat("uk-UA", { useGrouping: true }).format(
        item.priceOffer?.amount
      ),
      " ",
      item.priceOffer?.currency
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: `/tour?priceId=${item.priceOffer?.id}&hotelId=${item.priceOffer?.hotelID}`,
        className: "offer-link",
        children: "Відкрити ціну"
      }
    )
  ] });
}
function Offers() {
  const offersContext = useContext(OffersContext);
  if (!offersContext) {
    throw new Error(`Context must be used within a OffersContext`);
  }
  const { offers } = offersContext;
  return /* @__PURE__ */ jsx("div", { className: "offers", children: offers.sort((a, b) => (a.priceOffer?.amount ?? 0) - (b.priceOffer?.amount ?? 0)).map((item) => /* @__PURE__ */ jsx(Offer, { item }, item.priceOffer?.id)) });
}
function SearchResults({
  searchResponse,
  setSearchResponse
}) {
  const [isTimeForRequest, setIsTimeForRequest] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resultsContext = useContext(SearchResultsContext);
  const hotelContext = useContext(HotelsContext);
  const offersContext = useContext(OffersContext);
  if (!resultsContext || !hotelContext || !offersContext) {
    throw new Error(
      `Context must be used within a ${!SearchResultsContext ? "SearchResultsContext" : !offersContext ? "OffersContext" : "HotelsContext"}`
    );
  }
  const { searchResults, setSearchResults } = resultsContext;
  const { hotels } = hotelContext;
  const { offers, setOffers } = offersContext;
  const checkIsTimeForRequest = () => {
    if (searchResponse.waitUntil && new Date(searchResponse.waitUntil) < /* @__PURE__ */ new Date()) {
      setIsTimeForRequest(true);
    }
  };
  useEffect(() => {
    if (searchResponse.waitUntil) {
      setError("");
      setIsLoading(true);
      checkIsTimeForRequest();
      const intervalId = setInterval(checkIsTimeForRequest, 1e3);
      return () => clearInterval(intervalId);
    }
  }, [searchResponse.waitUntil]);
  useEffect(() => {
    if (isTimeForRequest) {
      fetchWithRetry(getSearchPrices(searchResponse.token), setError, setIsLoading).then((resp) => {
        if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
        return resp.json();
      }).then((data) => {
        const dataArray = Object.values(data.prices);
        const allHotels = [];
        setSearchResults(dataArray);
        hotels.map((item) => {
          item.hotels?.map((hotel) => {
            allHotels.push(hotel);
          });
        });
        dataArray.map((offer) => {
          if (!offers.map((item) => item.priceOffer?.hotelID).includes(offer.hotelID)) {
            allHotels.map((hotel) => {
              if (+(offer.hotelID ?? 0) === hotel.id) {
                setOffers((prevOffers) => [
                  ...prevOffers,
                  {
                    priceOffer: offer,
                    hotel
                  }
                ]);
              }
            });
          }
        });
      }).finally(() => {
        setIsTimeForRequest(false);
        setIsLoading(false);
        setSearchResponse({
          ...searchResponse,
          waitUntil: null
        });
      });
    }
  }, [isTimeForRequest]);
  return /* @__PURE__ */ jsxs("div", { className: "search-results", children: [
    isLoading ? /* @__PURE__ */ jsx("div", { className: "search-results__spinner", children: /* @__PURE__ */ jsx(Spinner, {}) }) : searchResults?.length === 0 && /* @__PURE__ */ jsx("span", { className: "search-results__empty", children: "За вашим запитом турів не знайдено" }),
    error.length > 0 && /* @__PURE__ */ jsx(TextError, { error }),
    /* @__PURE__ */ jsx(Offers, {})
  ] });
}
const StoreContextProvider = ({ children }) => {
  return /* @__PURE__ */ jsx(OffersContextProvider, { children: /* @__PURE__ */ jsx(HotelsContextProvider, { children: /* @__PURE__ */ jsx(SearchResultsContextProvider, { children }) }) });
};
function HomePage() {
  const [countries, setCountries] = useState([]);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [inputText, setInputText] = useState("");
  const [searchResponse, setSearchResponse] = useState({
    token: "",
    waitUntil: null
  });
  useEffect(() => {
    fetchWithRetry(getCountries(), setError).then(async (resp) => {
      const data = await resp.json();
      return setCountries(Object.values(data));
    });
  }, []);
  useEffect(() => {
    if (inputText.length > 0)
      fetchWithRetry(searchGeo(inputText), setError).then(async (resp) => {
        const data = await resp.json();
        return setPlaces(Object.values(data));
      });
  }, [inputText]);
  return /* @__PURE__ */ jsx(StoreContextProvider, { children: /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [
    error.length > 0 ? error : /* @__PURE__ */ jsx(
      DropdownInput,
      {
        countries,
        placeholder: "Форма пошуку турів",
        selectedPlaces,
        setSelectedPlaces,
        inputText,
        setInputText,
        places,
        searchResponse,
        setSearchResponse
      }
    ),
    /* @__PURE__ */ jsx(SearchResults, { searchResponse, setSearchResponse })
  ] }) }) }) });
}
function meta$1({}) {
  return [{
    title: "Пошук туру"
  }, {
    name: "description",
    content: "Пошук туру"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HomePage, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function GeoIconSvg() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "#000000",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" }),
        /* @__PURE__ */ jsx("path", { d: "M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" })
      ]
    }
  );
}
function CityIconSvg() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3 22V12C3 10.1144 3 9.17157 3.58579 8.58579C4.17157 8 5.11438 8 7 8C8.88562 8 9.82843 8 10.4142 8.58579C11 9.17157 11 10.1144 11 12",
            stroke: "#1C274C",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M17 22V16C17 14.1144 17 13.1716 16.4142 12.5858C15.8284 12 14.8856 12 13 12H11C9.11438 12 8.17157 12 7.58579 12.5858C7 13.1716 7 14.1144 7 16V22",
            stroke: "#1C274C",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21 21.9999V7.77195C21 6.4311 21 5.76068 20.6439 5.24676C20.2877 4.73283 19.66 4.49743 18.4045 4.02663C15.9492 3.10591 14.7216 2.64555 13.8608 3.2421C13 3.83864 13 5.14974 13 7.77195V11.9999",
            stroke: "#1C274C",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 8V6.5C4 5.55719 4 5.08579 4.29289 4.79289C4.58579 4.5 5.05719 4.5 6 4.5H8C8.94281 4.5 9.41421 4.5 9.70711 4.79289C10 5.08579 10 5.55719 10 6.5V8",
            stroke: "#1C274C",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M7 4V2", stroke: "#1C274C", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M22 22L2 22", stroke: "#1C274C", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M10 15H14", stroke: "#1C274C", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M10 18H14", stroke: "#1C274C", strokeWidth: "1.5", strokeLinecap: "round" })
      ]
    }
  );
}
function ServiceItem({ icon, title }) {
  return /* @__PURE__ */ jsxs("div", { className: "offer-service", children: [
    icon,
    /* @__PURE__ */ jsx("span", { className: "offer-service__text", children: title })
  ] });
}
function WifiIconSvg() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M0 7L1.17157 5.82843C2.98259 4.01741 5.43884 3 8 3C10.5612 3 13.0174 4.01742 14.8284 5.82843L16 7L14.5858 8.41421L13.4142 7.24264C11.9783 5.8067 10.0307 5 8 5C5.96928 5 4.02173 5.8067 2.58579 7.24264L1.41421 8.41421L0 7Z",
            fill: "#000000"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4.24264 11.2426L2.82843 9.82843L4 8.65685C5.06086 7.59599 6.49971 7 8 7C9.50029 7 10.9391 7.59599 12 8.65686L13.1716 9.82843L11.7574 11.2426L10.5858 10.0711C9.89999 9.38527 8.96986 9 8 9C7.03014 9 6.1 9.38527 5.41421 10.0711L4.24264 11.2426Z",
            fill: "#000000"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M8 15L5.65685 12.6569L6.82842 11.4853C7.13914 11.1746 7.56057 11 8 11C8.43942 11 8.86085 11.1746 9.17157 11.4853L10.3431 12.6569L8 15Z",
            fill: "#000000"
          }
        )
      ]
    }
  );
}
function LaundryIconSvg() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M14 13C14 14.1046 13.1046 15 12 15M17 6H17.01M17 13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13ZM6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21Z",
          stroke: "#000000",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function ParkingIconSvg() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "#000000",
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M5,22H19a3,3,0,0,0,3-3V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V19A3,3,0,0,0,5,22ZM4,5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1ZM9,18a1,1,0,0,0,1-1V14h2a4,4,0,0,0,0-8H9A1,1,0,0,0,8,7V17A1,1,0,0,0,9,18ZM10,8h2a2,2,0,0,1,0,4H10Z" })
    }
  );
}
function TennisIconSvg() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3.33995 16.9997C6.10137 21.7826 12.2173 23.4214 17.0002 20.66C18.9498 19.5344 20.377 17.8514 21.1967 15.9286C22.388 13.1341 22.2963 9.83304 20.6605 6.99972C19.0246 4.1664 16.2117 2.43642 13.196 2.07088C11.1209 1.81935 8.94981 2.21386 7.00021 3.33946C2.21728 6.10089 0.578527 12.2168 3.33995 16.9997Z",
            stroke: "#1C274C",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            opacity: "0.5",
            d: "M13.1958 2.07129C13.1958 2.07129 12.9641 5.67 15.4641 10.0001C17.9641 14.3303 21.1965 15.929 21.1965 15.929M2.80347 8.07129C2.80347 8.07129 6.03588 9.67 8.53588 14.0001C11.0359 18.3303 10.8042 21.929 10.8042 21.929",
            stroke: "#1C274C",
            strokeWidth: "1.5"
          }
        )
      ]
    }
  );
}
function AquaParkIconSvg() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "#000000",
      height: "15px",
      width: "15px",
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 480 480",
      xmlSpace: "preserve",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          id: "XMLID_1760_",
          d: "M180,400v-90c0-16.542-13.458-30-30-30s-30,13.458-30,30v90c0,5.522-4.478,10-10,10\n	c-5.522,0-10-4.478-10-10v-90c0-27.57,22.43-50,50-50s50,22.43,50,50v90c0,5.522-4.478,10-10,10C184.478,410,180,405.522,180,400z\n	 M0.514,103.162C-0.847,99.079,0.558,94.583,4.001,92l104-78c12.038-9.028,26.954-14,42-14c15.046,0,29.962,4.972,42,14L296,92\n	c3.443,2.583,4.848,7.079,3.487,11.162C298.126,107.246,294.304,110,290,110h-20v50h11.495c15.964,0,31.593,5.527,44.008,15.563\n	c12.414,10.036,21.094,24.16,24.438,39.771l13.551,63.236c2.661,12.417,13.81,21.43,26.508,21.43h80c5.522,0,10,4.478,10,10\n	s-4.478,10-10,10h-50v80c0,5.522-4.478,10-10,10s-10-4.478-10-10v-80h-10c-22.067,0-41.439-15.661-46.064-37.238l-13.551-63.237\n	C325.477,196.622,304.917,180,281.495,180H270v220c0,5.522-4.478,10-10,10s-10-4.478-10-10V180H50.001v220c0,5.522-4.478,10-10,10\n	s-10-4.478-10-10V110h-20C5.696,110,1.875,107.246,0.514,103.162z M250,110H50.001v50H250V110z M40.001,90H260l-80-60\n	c-8.599-6.448-19.253-10-30-10c-10.747,0-21.401,3.552-30,10L40.001,90z M475.392,430.181c-4.65-2.978-10.836-1.622-13.814,3.027\n	C450.833,449.984,432.557,460,412.688,460c-19.864,0-38.139-10.016-48.885-26.792c-1.839-2.87-5.013-4.606-8.421-4.606h-0.513\n	c-3.408,0-6.582,1.736-8.421,4.606C335.703,449.984,317.427,460,297.562,460c-19.864,0-38.139-10.016-48.885-26.792\n	c-1.839-2.87-5.013-4.606-8.421-4.606h-0.513c-3.408,0-6.582,1.736-8.421,4.606C220.577,449.984,202.302,460,182.438,460\n	c-19.865,0-38.14-10.016-48.886-26.792c-1.839-2.87-5.013-4.606-8.421-4.606h-0.513c-3.408,0-6.582,1.736-8.421,4.606\n	C105.452,449.984,87.176,460,67.312,460c-19.869,0-38.145-10.016-48.89-26.792c-2.979-4.649-9.164-6.007-13.814-3.027\n	c-4.65,2.979-6.006,9.164-3.027,13.814C16.021,466.54,40.593,480,67.312,480c22.193,0,42.907-9.289,57.562-25.359\n	C139.53,470.711,160.244,480,182.438,480c22.193,0,42.907-9.289,57.562-25.359C254.655,470.711,275.369,480,297.562,480\n	c22.194,0,42.908-9.289,57.563-25.359C369.781,470.711,390.494,480,412.688,480c26.72,0,51.292-13.46,65.732-36.005\n	C481.398,439.345,480.043,433.159,475.392,430.181z"
        }
      )
    }
  );
}
function CalendarIconSvg() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "15px",
      height: "15px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z",
          stroke: "#000000",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function TourItem({
  item
}) {
  return /* @__PURE__ */ jsxs("div", { className: "offer", children: [
    /* @__PURE__ */ jsx("title", { children: item.hotel?.name }),
    /* @__PURE__ */ jsx("a", { href: `/`, className: "offer-link", children: "На головну" }),
    /* @__PURE__ */ jsx("span", { className: "offer-title", children: item.hotel?.name }),
    /* @__PURE__ */ jsxs("div", { className: "offer-address__wrapper", children: [
      /* @__PURE__ */ jsxs("span", { className: "offer-address", children: [
        /* @__PURE__ */ jsx(GeoIconSvg, {}),
        item.hotel?.countryName
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "offer-address", children: [
        /* @__PURE__ */ jsx(CityIconSvg, {}),
        item.hotel?.cityName
      ] })
    ] }),
    item.hotel?.img && /* @__PURE__ */ jsx("img", { src: item.hotel.img, className: "offer-image", loading: "lazy" }),
    /* @__PURE__ */ jsx("span", { className: "offer-description__title", children: "Опис" }),
    /* @__PURE__ */ jsx("span", { className: "offer-description__text", children: item.hotel?.description }),
    /* @__PURE__ */ jsx("span", { className: "offer-description__title", children: "Сервіси" }),
    /* @__PURE__ */ jsxs("div", { className: "offer-service__wrapper", children: [
      item.hotel?.services.aquapark === "yes" && /* @__PURE__ */ jsx(ServiceItem, { icon: /* @__PURE__ */ jsx(AquaParkIconSvg, {}), title: "Басейн" }),
      item.hotel?.services.laundry === "yes" && /* @__PURE__ */ jsx(ServiceItem, { icon: /* @__PURE__ */ jsx(LaundryIconSvg, {}), title: "Прання" }),
      item.hotel?.services.parking === "yes" && /* @__PURE__ */ jsx(ServiceItem, { icon: /* @__PURE__ */ jsx(ParkingIconSvg, {}), title: "Парковка" }),
      item.hotel?.services.tennis_court === "yes" && /* @__PURE__ */ jsx(ServiceItem, { icon: /* @__PURE__ */ jsx(TennisIconSvg, {}), title: "Тенісний корт" }),
      item.hotel?.services.wifi === "yes" && /* @__PURE__ */ jsx(ServiceItem, { icon: /* @__PURE__ */ jsx(WifiIconSvg, {}), title: "WiFi" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "offer-date__wrapper", children: [
      /* @__PURE__ */ jsx(CalendarIconSvg, {}),
      /* @__PURE__ */ jsx("span", { className: "offer-date", children: moment(item.priceOffer?.startDate, "YYYY-MM-DD").format("DD.MM.YYYY") })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "offer-amout", children: [
      item.priceOffer?.amount && new Intl.NumberFormat("uk-UA", { useGrouping: true }).format(
        item.priceOffer?.amount
      ),
      " ",
      item.priceOffer?.currency
    ] })
  ] });
}
function TourPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [price, setPrice] = useState(null);
  const [hotel, setHotel] = useState(null);
  useEffect(() => {
    if (searchParams.get("hotelId") && searchParams.get("priceId")) {
      fetchWithRetry(getPrice(searchParams.get("priceId")), setError).then(async (resp) => {
        const data = await resp.json();
        return setPrice(data);
      });
      fetchWithRetry(getHotel(+(searchParams.get("hotelId") ?? 0)), setError).then(async (resp) => {
        const data = await resp.json();
        return setHotel(data);
      });
    }
  }, [searchParams]);
  return /* @__PURE__ */ jsx("div", { className: "offers", children: error.length > 0 ? /* @__PURE__ */ jsx(TextError, { error }) : /* @__PURE__ */ jsx(
    TourItem,
    {
      item: {
        priceOffer: price,
        hotel
      }
    }
  ) });
}
function meta({}) {
  return [{
    title: "Пошук туру"
  }, {
    name: "description",
    content: "Пошук туру"
  }];
}
const tour = UNSAFE_withComponentProps(function Tour() {
  return /* @__PURE__ */ jsx(TourPage, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tour,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BhNsym_B.js", "imports": ["/assets/chunk-UIGDSWPH-4ZIJcO7e.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-PHK8-tcM.js", "imports": ["/assets/chunk-UIGDSWPH-4ZIJcO7e.js"], "css": ["/assets/root-BDxu7-5s.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BfDALCja.js", "imports": ["/assets/chunk-UIGDSWPH-4ZIJcO7e.js", "/assets/moment-D9XNBQqi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tour": { "id": "routes/tour", "parentId": "root", "path": "/tour", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tour-B-fx9N2J.js", "imports": ["/assets/chunk-UIGDSWPH-4ZIJcO7e.js", "/assets/moment-D9XNBQqi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f690e4b1.js", "version": "f690e4b1", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/tour": {
    id: "routes/tour",
    parentId: "root",
    path: "/tour",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
