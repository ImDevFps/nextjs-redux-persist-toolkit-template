import type { NextPage } from "next";
import React from "react";
import { wrapper } from "@/redux/store";
import { useDispatch } from "react-redux";
import { changeTheme } from "@/redux/user/user.reducer";
import { fetchUser } from "@/redux/user/user.actions";
import { useAppSelector } from "@/hooks/redux.hooks";

const Home: NextPage = () => {
  const { themeSetting, users } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div>
      <div>{themeSetting}</div>
      <button
        onClick={() =>
          themeSetting === "light"
            ? dispatch(changeTheme("dark"))
            : dispatch(changeTheme("light"))
        }
      >
        {themeSetting ? "Logout" : "LogIn"}
      </button>
    </div>
  );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      console.log(store.getState().user);

      await store.dispatch(fetchUser());

      console.log("2. Page.getStaticProps uses the store to dispatch things");
      store.dispatch({
        type: "TICK",
        payload: "was set in other page ",
      });

      return { props: {} };
    }
);
