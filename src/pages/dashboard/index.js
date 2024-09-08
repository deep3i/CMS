import React, { useEffect, useState } from "react";
import ProfilePage from "./profile";
import TooltipComponent from "../toolTipComponent";
import SidebarComponent from "../../component/dashboard/SidebarComponent";
import NavComponent from "../../component/dashboard/NavComponent";
import CardComponent from "../../component/dashboard/CardComponent";
import UsersTableComponent from "../../component/users/UsersTableComponent";
import BlogPostComponent from "../../component/dashboard/BlogPostComponent";
import ChartComponent from "../../component/dashboard/ChartComponent";
import ActivityComponent from "../../component/dashboard/ActivityComponent";
import ModalComponent from "../../component/ModalComponent";
import LogsComponent from "../../component/dashboard/LogsComponent";
import AddCategorieTagComponent from "../../component/dashboard/AddCategorieTagComponent";
import OnboardingTour from "../../component/OnboardingTour";
import SettingComponent from "../../component/settings";
import ModeratorAccessComponent from "../../component/dashboard/ModeratorComponent";
import { getAllUserDetail } from "../../redux/auth/slice";
import CallToActionComponent from "../callToAction";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDashboardDetail,
  handleViewDetail,
} from "../../redux/dashboard/slice";
import { hasAccess } from "../../utils/common";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { isModal } = useSelector(getAllDashboardDetail);
  const {
    user: { access },
  } = useSelector(getAllUserDetail);
  const [runTour, setRunTour] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (currentPage === 0 && !hasAccess({ pageNumber: 0, access: access })) {
      setCurrentPage(1);
    }
    if (currentPage === 1 && !hasAccess({ pageNumber: 1, access: access })) {
      setCurrentPage(2);
    }
    if (currentPage === 2 && !hasAccess({ pageNumber: 2, access: access })) {
      setCurrentPage(3);
    }
    if (currentPage === 3 && !hasAccess({ pageNumber: 3, access: access })) {
      setCurrentPage(4);
    }
    if (currentPage === 4 && !hasAccess({ pageNumber: 4, access: access })) {
      setCurrentPage(5);
    }
    if (currentPage === 5 && !hasAccess({ pageNumber: 5, access: access })) {
      setCurrentPage(6);
    }
    if (currentPage === 6 && !hasAccess({ pageNumber: 6, access: access })) {
      setCurrentPage(7);
    }
  }, [access, currentPage]);

  return (
    <>
      <OnboardingTour runTour={runTour} setRunTour={setRunTour} />
      <div className="min-h-screen bg-gray-50/50">
        <SidebarComponent
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setSearchTerm={setSearchTerm}
        />
        <div className="p-4 xl:ml-80">
          <NavComponent
            setCurrentPage={setCurrentPage}
            runTour={runTour}
            setRunTour={setRunTour}
            currentPage={currentPage}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
          <div className="mt-12">
            {currentPage === 0 &&
              hasAccess({ pageNumber: 0, access: access }) && (
                <>
                  <CardComponent />
                  <ChartComponent />
                </>
              )}
            {currentPage === 1 &&
              hasAccess({ pageNumber: 1, access: access }) && <ProfilePage />}
            {currentPage === 2 &&
              hasAccess({ pageNumber: 2, access: access }) && (
                <UsersTableComponent searchTerm={searchTerm} />
              )}
            {currentPage === 3 &&
              hasAccess({ pageNumber: 3, access: access }) && (
                <BlogPostComponent searchTerm={searchTerm} />
              )}
            {currentPage === 4 &&
              hasAccess({ pageNumber: 4, access: access }) && (
                <ActivityComponent />
              )}
            {currentPage === 5 &&
              hasAccess({ pageNumber: 5, access: access }) && <LogsComponent />}
            {currentPage === 6 &&
              hasAccess({ pageNumber: 6, access: access }) && (
                <AddCategorieTagComponent searchTerm={searchTerm} />
              )}
            {currentPage === 7 &&
              hasAccess({ pageNumber: 7, access: access }) && (
                <SettingComponent />
              )}
            {currentPage === 8 && <ModeratorAccessComponent />}
          </div>
        </div>
      </div>
      {isModal?.open && (
        <ModalComponent
          open={isModal.open}
          handleClose={() => dispatch(handleViewDetail())}
          data={isModal?.data}
        />
      )}
      <TooltipComponent />
      <CallToActionComponent />
    </>
  );
};

export default DashboardPage;
