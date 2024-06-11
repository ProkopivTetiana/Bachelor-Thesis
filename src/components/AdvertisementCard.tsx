// import React, { FunctionComponent, useEffect, useState } from "react";

// import { NavLink, useParams } from "react-router-dom";
// import User from "../../../assets/user.svg";
// import Camera from "../../../assets/camera.svg";
// import Button from "./Button/Button";
// import { AdvertisementType } from "../../../types/Advertisement";
// import Delete from "../../../assets/trash.svg";
// import useAdvertisementList from "../../pages/AdvertisementList/hooks/useAdvertisementList";
// import useAdvertisement from "../../pages/Advertisement/hooks/useAdvertisement";
// import useProfile from "../../pages/Profile/hooks/useProfile";

// type AdvertisementCardProps = {
//   paperClassName?: string;
//   advertisement: AdvertisementType;
// };

// const AdvertisementCard: FunctionComponent<AdvertisementCardProps> = ({
//   paperClassName,
//   advertisement,
// }) => {
//   const { list, name, id } = useParams();

//   const {
//     deleteAdvertisementByIDHandler,
//     getAdvertisementsByUserIdHandler,
//     profile,
//   } = useAdvertisementList();

//   const { getCategoriesHandler, getCategoryHandler, categories, category } =
//     useAdvertisement();

//   const { getUserNameHandler, getUsersHandler, profileName, users } =
//     useProfile();

//   let newDate = new Date(advertisement.time);
//   let date = newDate.getDate();
//   let month = newDate.getMonth();
//   let year = newDate.getFullYear();

//   // const handleDeleteClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
//   //   event.stopPropagation();
//   // };
//   const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//     deleteAdvertisementByIDHandler(advertisement.id);
//     console.log("start");
//     getAdvertisementsByUserIdHandler(profile.id.toString());
//     console.log("finish");
//     console.log("profile.id.toString()", profile.id.toString());
//   };

//   // const [firstName, setFirstName ] = useState("");
//   // const [lastName, setLastName ] = useState("");
//   // setFirstName(users.find((users) => users.id.toString() === advertisement.userId)?.firstName);
//   // setLastName(users.find((users) => users.id.toString() === advertisement.userId)?.lastName);

//   useEffect(() => {
//     // getCategoryHandler(advertisement.categoryId);
//     getUserNameHandler(advertisement.userId);
//     getCategoriesHandler();
//     getUsersHandler();
//   }, []);

//   const [firstName, setFirstName] = useState();
//   const [lastName, setLastName] = useState();

//   return (
//     <NavLink
//       to={`/advertisement/${advertisement.id}`}
//       className={`flex w-[22%] cursor-pointer flex-col gap-4 rounded-lg bg-white px-4 py-3 shadow-md shadow-gray-400 hover:bg-gray-100 ${paperClassName}`}
//     >
//       {/* {title && <div className={``}>{title}</div>} */}
//       <div className="flex items-center gap-4">
//         <div
//           className={`flex flex h-10 w-10 cursor-pointer items-center  justify-center rounded-full border-[1px] border-orange-400 bg-orange-100 uppercase text-orange-600`}
//           style={{ fontSize: 14 }}
//         >
//           {`${users.find((users) => users.id.toString() === advertisement.userId)?.firstName?.slice(0, 1)}${users.find((users) => users.id.toString() === advertisement.userId)?.lastName?.slice(0, 1)}`}
//         </div>
//         <p className="text-sm font-medium text-slate-900">
//           {
//             users.find((users) => users.id.toString() === advertisement.userId)
//               ?.firstName
//           }{" "}
//           {
//             users.find((users) => users.id.toString() === advertisement.userId)
//               ?.lastName
//           }
//         </p>
//         {list && list === "my-list" && (
//           <div onClick={handleDeleteClick}>
//             <img
//               className="h-10 w-10 rounded-full p-2 hover:bg-orange-200"
//               src={Delete}
//               alt="Видалити"
//             />
//           </div>
//         )}

//         {/* <button onClick={handleDeleteClick} className="w-10 h-10 hover:bg-orange-200 rounded-full p-2" type="button">
//             <img className="w-full h-full" src={Delete} alt="" />
//           </button> */}

//         {/* <Button className="bg-white border-[0px] hover:bg-white  w-[40px] rounded-full"> <img className="w-10 h-6" src={Delete} /> </Button> */}
//       </div>

//       <div className="flex gap-8">
//         <div className="rounded-xl border border-slate-300 px-8 py-8">
//           <img className="w-full " src={Camera} alt="" />
//         </div>
//         <div className="flex flex-col">
//           <p className="text-sm font-medium text-slate-900">
//             {advertisement.title}
//           </p>
//           <p className="truncate text-sm text-slate-500">
//             {advertisement.bookAuthorFullName}
//           </p>
//           <p className="truncate text-sm text-slate-500">
//             {advertisement.publicationYear}
//           </p>
//           <p className="text-sm font-medium text-slate-900">
//             {
//               categories.find(
//                 (category) => category.id === advertisement.categoryId,
//               )?.name
//             }
//           </p>
//         </div>
//       </div>

//       <div className="">
//         <p className="text-sm font-medium text-slate-900">Опис:</p>
//         <p className="truncate text-sm text-slate-500">
//           {advertisement.description}
//         </p>
//       </div>
//       <div className="flex flex-col">
//         <p className="text-sm font-medium text-slate-900">Віддам:</p>
//         <div className="flex justify-between">
//           <p className="text-sm font-medium text-slate-900">
//             {advertisement.time}
//           </p>
//           <p className="text-sm text-slate-900">
//             {advertisement.publicationDate}
//           </p>
//         </div>
//       </div>
//       {/* {status &&
//         <div className="flex justify-between items-center">
//           <div className="">{status}</div>
//           {status === "Відкритий" && <Button className="h-4 w-4/12">Закрити</Button>}
//         </div>
//       }         */}
//     </NavLink>
//   );
// };

// export default AdvertisementCard;
