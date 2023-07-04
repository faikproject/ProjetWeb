import { useContext, useEffect } from "react";

//CONTEXTS
import { FormContext } from "../context/formContext";

function UseForm(readyToWatch, watch) {
  //CONTEXTS
  const [formContextState, formContextDispatch] = useContext(FormContext);

  //EFFECTS
  useEffect(() => {
    if (readyToWatch) {
      const subscription = watch((value, { name, type }) => {
        formContextDispatch({ type: "change", status: true });
      });
      return () => subscription.unsubscribe();
    }
    //eslint-disable-next-line
  }, [readyToWatch]);
  // }, [readyToWatch, watch, formContextDispatch]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        document
          .querySelectorAll(".input:focus")
          .forEach(function(input) {
            if (
              formContextState.action === "change" &&
              formContextState.status
            ) {
              formContextDispatch({
                type: "save",
                status: false,
              });
            }
          });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    //eslint-disable-next-line
  }, [formContextState, formContextDispatch]);
}

export default UseForm;