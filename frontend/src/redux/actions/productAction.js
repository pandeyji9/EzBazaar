import API from "../../utils/API";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_PRODUCT_FAIL,
} from "../constants/productContants";

// Get Product Details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await API.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ALl Product

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 50000], category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const { data } = await API.get(url);
      if (data && data.success) {
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

// Get ALl Admin Product

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });

    const { data } = await API.get(`/api/v1/admin/products`);
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Create Product __ ADMIN

export const createProduct = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: { "Content-type": "multipart/form-data" },
    };

    await API.post(`/api/v1/admin/product/new`, formData, config);
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Delete Product -- ADMIN

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await API.delete(`/api/v1/admin/product/${id}`);

    if (data && data.success === false) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: data.message,
      });
    }

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Review

export const createReview =
  (rating, comment, productId) => async (dispatch) => {
    try {
      dispatch({
        type: REVIEW_PRODUCT_REQUEST,
      });

      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.put(
        `/api/v1/review`,
        { rating, comment, productId },
        config
      );

      if (data && data.success === false) {
        dispatch({
          type: REVIEW_PRODUCT_FAIL,
          payload: data.message,
        });
      }

      if (data && data.success) {
        dispatch({
          type: REVIEW_PRODUCT_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({
        type: REVIEW_PRODUCT_FAIL,
        payload: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

// Clearing the error

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Reset Product Creation

export const resetCreateProduct = () => async (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT_RESET,
  });
};
