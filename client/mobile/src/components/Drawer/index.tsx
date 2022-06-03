import { createPortal, FC, useRef, useEffect, useState } from "preact/compat";

type Placement = "left" | "right" | "top" | "bottom";
const Drawer: FC<{
  visible: boolean;
  onClose: () => void;
  placement?: Placement;
}> = ({ visible, onClose, placement = "left", children }) => {
  const transformMap: Record<Placement, string> = {
    left: "translateX(-100%)",
    right: "translateX(100%)",
    top: "translateY(-100%)",
    bottom: "translateY(100%)",
  };
  const flexDirectionMap: Record<Placement, string> = {
    left: "row",
    right: "row-reverse",
    top: "column",
    bottom: "column-reverse",
  };
  const asideRef = useRef<HTMLDivElement>(null);
  const isRow = (["left", "right"] as Placement[]).includes(placement);
  const [percentage, setPercentage] = useState(1);
  console.log(percentage);

  useEffect(() => {
    const aside = asideRef.current;
    if (aside) {
      let tmp = 1;
      if (isRow) {
        const w = aside.clientWidth;
        tmp = (aside.firstElementChild?.clientWidth ?? w) / w;
      } else {
        const h = aside.clientHeight;
        tmp = (aside.firstElementChild?.clientHeight ?? h) / h;
      }
      console.log(tmp);
      setPercentage(tmp);
    }
  }, [asideRef.current]);

  return (
    <>
      {createPortal(
        <aside
          ref={asideRef}
          class={`w-100vw h-full fixed flex top-0 duration-200 bg-black ${
            visible
              ? // bg or inset box-shadow
                "bg-opacity-60"
              : "bg-opacity-0"
          }`}
          style={{
            boxShadow: visible
              ? "rgb(0 0 0 / 60%) 0 0 0 10000px"
              : "rgb(0 0 0 / 0%) 0 0 0 10000px",
            transform: visible ? "none" : transformMap[placement],
            flexDirection: flexDirectionMap[placement],
            // transitionDuration: "1000ms",
            // transitionTimingFunction: visible
            //   ? "cubic-bezier(0, 0.75, 0, 0.75)"
            //   : "cubic-bezier(1, 0.25, 1, 0.25)",
            transition: `box-shadow 200ms ease, background 200ms ease, transform 200ms ${
              visible
                ? `cubic-bezier(0, ${1 - percentage}, 0, ${1 - percentage})`
                : `cubic-bezier(1, ${percentage}, 1, ${percentage})`
            }`,
          }}
          onClick={(e) => {
            e.target === e.currentTarget && onClose();
          }}
        >
          {children}
        </aside>,
        document.body
      )}
    </>
  );
};

export default Drawer;
