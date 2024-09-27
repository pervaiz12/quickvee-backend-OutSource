import React, { useState, useEffect } from "react";

import RefundSummaryList from "./RefundSummaryList";

import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import PasswordShow from "../../../Common/passwordShow";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import useDebounce from "../../../hooks/useDebouncs";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import BrandLogic from "../../Brands/brandLogic";
import TagLogic from "../../Tags/TagLogic";
import { fetchTagData } from "../../../Redux/features/Brand/brandsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const RefundSummary = ({ hide }) => {
  const getBrandListSlice = useSelector((state) => state?.brandData);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [filteredData, setFilteredData] = useState({
    category_id: "all",
    reason_name: "all",
    find_brand: "",
    find_tag: "",
  });
  const [seletedReason, setSelectedReason] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");
  const [searchRecord, setSearchRecord] = useState("");
  const debouncedValue = useDebounce(searchRecord);
  const [isTablet, setIsTablet] = useState(false);
  const [TagList, setGetTagList] = useState([]);
  const { getBrandList } = BrandLogic();
  const dispatch = useDispatch();
 
  const getBrandData = async () => {
    let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
    let data = { merchant_id, type: 0, ...userTypeData };
    try {
      const response = await dispatch(fetchTagData(data)).unwrap();
      
      setGetTagList(response);
    } catch (error) {
      if (error?.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };
  useEffect(() => {
    
    if (
      !getBrandListSlice?.loading &&
      !!getBrandListSlice?.tagData &&
      getBrandListSlice?.tagData.length > 0
    ) {
     
      setGetTagList(getBrandListSlice?.tagData);

    } else {
      setGetTagList([]);

    }
  }, [getBrandListSlice?.loading]);
  useEffect(() => {
    getBrandData();
  }, []);

  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      const updatedData = {
        ...filteredData,
        ...data,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "seletedReason":
        if (option.title === "All") {
          setSelectedReason(option.title);
          setFilteredData({
            ...filteredData,
            reason_name: "all",
          });
        } else {
          setSelectedReason(option.title);
          setFilteredData({
            ...filteredData,
            reason_name: option.title,
          });
        }
        break;
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");
          setFilteredData({
            ...filteredData,
            category_id: "all",
          });
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);
          setFilteredData({
            ...filteredData,
            category_id,
          });
        }
      case "brand":
        if (option === "All") {
          setSelectedBrand("All");
          setFilteredData({
            ...filteredData,
            find_brand: "",
          });
        } else {
          const brand = option.title;
          setSelectedBrand(option.title);
          setFilteredData({
            ...filteredData,
            find_brand:brand,
          });
        }
        case "tags":
        if (option === "All") {
          setSelectedTag("All");
          setFilteredData({
            ...filteredData,
            find_tag: "",
          });
        } else {
          const tag = option.title;
          setSelectedTag(option.title);
          setFilteredData({
            ...filteredData,
            find_tag:tag,
          });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reasonList = [
    "All",
    "Accidental Charge",
    "Cancelled Order",
    "Defective Item",
    "Fraudulent Order",
    "Returned Goods",
    "Out of Stock",
    "Other",
  ];

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  let data = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    ...userTypeData,
  };

  useEffect(() => {
    const { token, ...dataNew } = data;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + TAXE_CATEGORY_LIST,
          dataNew,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the API response has a data property containing the category list
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };
  return (
    <>
      <Grid container sx={{ pb: 2.5 }} className="box_shadow_div ">
        <Grid item xs={12}>
          {!hide && <CustomHeader>Item Refund Report</CustomHeader>}
          <Grid item xs={12} sx={{ padding: 2.5 }}>
            <InputTextSearch
              className=""
              type="text"
              value={searchRecord}
              handleChange={handleSearchInputChange}
              placeholder="Search by Item Name..."
              autoComplete="off"
            />
          </Grid>
          <Grid container sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={12}>
              <h1 className="heading">Filter By</h1>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Category
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={categoryOptions}
                title="title"
                dropdownFor="category"
                selectedOption={selectedLCategoryType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label> Select Reason</label>
              <SelectDropDown
                listItem={reasonList.map((seletedReason) => ({
                  title: seletedReason,
                }))}
                title="title"
                onClickHandler={handleOptionClick}
                dropdownFor="seletedReason"
                selectedOption={seletedReason}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Brands</label>
              <SelectDropDown
                heading={"All"}
                listItem={getBrandList}
                title="title"
                onClickHandler={handleOptionClick}
                dropdownFor="brand"
                selectedOption={selectedBrand}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Tags</label>
              <SelectDropDown
                listItem={TagList}
                heading={"All"}
                title="title"
                onClickHandler={handleOptionClick}
                dropdownFor="tags"
                selectedOption={selectedTag}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <DateRangeComponent onDateRangeChange={handleDataFiltered} />
        </Grid>
      </Grid>

      <div className="q-order-main-page">
        <RefundSummaryList data={filteredData} debouncedValue={debouncedValue} />
      </div>
    </>
  );
};

export default RefundSummary;
