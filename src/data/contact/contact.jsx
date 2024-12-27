"use client";
import InputField from "@/components/shared/input-field";
import { PhoneInput } from "@/components/shared/phone-number";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleUpdateInServer } from "@/lib/actions/patch-server";
import { compareData } from "@/lib/utils";
import { validate } from "@/lib/validation";
import { Loader2, MapPin } from "lucide-react";
import React, { useEffect, useReducer } from "react";
import { toast } from "sonner";
// import GoogleMapReact from 'google-map-react';
const initialValues = {
  loading: false,
  error: {}, // Error state initialized as an empty object
  // Initialize with empty values for dynamic fields
};
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: {} }; // Clear errors on loading
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "success":
      return { ...state, loading: false, error: {} }; // Clear errors on success
    case "values":
      return { ...state, ...action.payload }; // Merge new values with the existing state
    default:
      return state;
  }
};

export default function ContactForm({ contact }) {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  
  const schema = {
    phone_number: { required: true },
    whatsapp_number: { required: true },
    email: { required: true },
    facebook_page: { required: true },
    instagram_page: { required: true },
    tiktok_account: { required: true },
  };
  const handleUpdateContact = async (state) => {
    const { valid, errors } = validate(state, schema);
    if (!valid) {
      dispatch({ type: "error", payload: errors }); // Set errors in state
      return;
    }
    try {
      const data = {};
      // Append all keys of state to data except 'loading' and 'error'
      Object.keys(state).forEach((key) => {
        if (key !== "loading" && key !== "error") {
          data[key] = state[key];
        }
      });
      const changes = compareData(contact, data);
      console.log("changes=>", changes);
      const response = await handleUpdateInServer(
        "/dashboard/contact-details/",
        "PATCH",
        JSON.parse(JSON.stringify(changes)),
        true,
        "object"
        // "/contact",
      );
      if (response.success) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error updating contact");
    }
  };

  useEffect(() => {
    dispatch({ type: "values", payload: contact });
  }, []);
  const position = [51.505, -0.09]
  return (
    <>
      <div className="flex flex-col gap-4 w-full md:w-[761px]">
        <PhoneInput
          name="phone_number"
          label="Phone Number"
          value={state.phone_number}
          onChange={(e) =>
            dispatch({
              type: "values",
              payload: { phone_number: e.target.value },
            })
          }
          error={state.error.phone_number}
          defaultCountry="EG"
          placeholder="Enter your phone number"
          className="w-full"
        />
        <PhoneInput
          name="whatsapp_number"
          label="Whatsapp Number"
          defaultCountry="EG"
          value={state.whatsapp_number}
          onChange={(e) =>
            dispatch({
              type: "values",
              payload: { whatsapp_number: e.target.value },
            })
          }
          error={state.error.whatsapp_number}
          placeholder="Enter your Whatsapp Number"
          className="w-full"
        />
        <InputField
          name="email"
          label="E-Mail"
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "values", payload: { email: e.target.value } })
          }
          placeholder="Enter your email"
          className="w-full"
        />
        <InputField
          name="facebook_page"
          label="Facebook Page Link"
          type="text"
          value={state.facebook_page}
          onChange={(e) =>
            dispatch({
              type: "values",
              payload: { facebook_page: e.target.value },
            })
          }
          error={state.error.facebook_page}
          placeholder="Enter your facebook page link"
          className="w-full"
        />
        <InputField
          name="instagram_page"
          label="Instagram Page Link"
          type="text"
          value={state.instagram_page}
          onChange={(e) =>
            dispatch({
              type: "values",
              payload: { instagram_page: e.target.value },
            })
          }
          error={state.error.instagram_page}
          placeholder="Enter your instagram page link"
          className="w-full"
        />
        <InputField
          name="tiktok_account"
          label="Tiktok account Link"
          type="text"
          value={state.tiktok_account}
          onChange={(e) =>
            dispatch({
              type: "values",
              payload: { tiktok_account: e.target.value },
            })
          }
          error={state.error.tiktok_account}
          placeholder="Enter your tiktok account link"
          className="w-full"
        />
        <div>
          <Label className="text-sm font-normal text-gray-500 leading-[20.96px]">
            Location
          </Label>
          {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      > */}
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      {/* </GoogleMapReact> */}
          {/* map loaction */}
          {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer> */}


          <div className="flex gap-2 mt-1">
            <MapPin size={16} color="#8D8D8D" />
            <p className="text-gray-400 font-normal text-sm">
              XWFV+9VQ, El-Tahrir, First 6th of October, Giza Governorate 15525
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-11 w-full  justify-center">
        <div  className=" w-full md:w-[30%] flex items-center gap-[85px]">
        <Button className={"cancel-button w-full"} variant="outline">
          Cancel
        </Button>

        <Button
          className={"confirm-button w-full"}
          onClick={() => handleUpdateContact(state)}
          disabled={state?.loading}
        >
          {state?.loading ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait...
            </>
          ) : (
            "Save"
          )}
        </Button>
        </div>
      </div>
    </>
  );
}
