import { Grid, Skeleton } from "@mui/material";
import React from "react";
import RegisterClosuresTable from "./RegisterClosuresTable";
import { useSelector } from "react-redux";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import NoDataFound from "../../../reuseableComponents/NoDataFound";

export default function RegisterClosuresTableContainer() {
  const RegisterClosuresReportReduxState = useSelector(
    (state) => state.RegisterClosuresReport
  );

  return (
    <>
      {RegisterClosuresReportReduxState.loading ||
      (RegisterClosuresReportReduxState.status &&
        !RegisterClosuresReportReduxState?.RegisterClosuresData?.length) ? (
        <>
          <Grid container sx={{ mb: 0 }} className="box_shadow_div">
            <Grid
              item
              xs={12}
              sx={{ padding: 2.5 }}
              container
              justifyContent="space-between"
              alignItems="center"
              className="cursor-pointer"
            >
              <Grid>
                <h1
                  className="text-[#0A64F9] text-[18px] flex"
                  style={{ marginBottom: 0 }}
                >
                  {`Station #  `}
                  {<Skeleton width={50} />}
                </h1>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  {["open:", "close:"].map((label, idx) => (
                    <Grid key={label} item sx={{ display: "flex", gap: 1 }}>
                      <p
                        className={`text-[16px] font-semibold ${
                          label === "close:"
                            ? "text-[#F90A0A]"
                            : "text-[#0A64F9]"
                        }`}
                      >
                        {label}
                      </p>
                      <p className="text-[#000000] text-[16px] font-semibold">
                        {idx === 0 ? (
                          <Skeleton width={100} />
                        ) : (
                          <Skeleton width={100} />
                        )}
                      </p>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <SkeletonTable
            columns={[
              "ETB Cash",
              "ETB Food",
              "Credit/Debit Card",
              "Loyalty",
              "Gift Card",
              "Store Credit",
              "Lottery",
              "Cash",
              "Total",
            ]}
          />
        </>
      ) : (
        RegisterClosuresReportReduxState &&
        RegisterClosuresReportReduxState?.RegisterClosuresData?.map((table) => (
          <RegisterClosuresTable table={table} />
        ))
      )}
      {!RegisterClosuresReportReduxState.loading &&
        !RegisterClosuresReportReduxState?.RegisterClosuresData?.length && (
          <NoDataFound />
        )}
    </>
  );
}
