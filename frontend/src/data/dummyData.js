// ===============================
// Dashboard Statistics
// ===============================

export const dashboardStats = [

{
title:"Total Land Parcels",
value:"52,430",
percentage:"+14%"
},

{
title:"Mining Zones",
value:"342",
percentage:"+8%"
},

{
title:"Government Land",
value:"18,200 Ha",
percentage:"+12%"
},

{
title:"Infrastructure Score",
value:"87/100",
percentage:"+6%"
}

];






// ===============================
// GIS Map Zones
// ===============================


export const gisZones = [

{
id:"GLIS-1001",
name:"Coal Mining Zone",
position:[23.7,86.4],
color:"#FACC15",
area:"450 Ha",
score:"87%",
risk:"Medium"
},


{
id:"GLIS-1002",
name:"Government Land",
position:[23.5,85.5],
color:"#16A34A",
area:"650 Ha",
score:"94%",
risk:"Low"
},


{
id:"GLIS-1003",
name:"Restricted Forest",
position:[22.9,85.2],
color:"#DC2626",
area:"300 Ha",
score:"35%",
risk:"High"
}

];









// ===============================
// Land Records Data
// ===============================


export const landRecords = [
{
id:"GLIS-UP-401",
location:"Jewar",
district:"Gautam Buddha Nagar",
owner:"YEIDA",
area:"140 Ha",
category:"Industrial Reserve",
risk:"High",
status:"Encroachment Alert"
},
{
id:"GLIS-UP-402",
location:"Dadri",
district:"Gautam Buddha Nagar",
owner:"Revenue Dept",
area:"85 Ha",
category:"Vacant Govt Land",
risk:"Low",
status:"Verified"
},
{
id:"GLIS-UP-403",
location:"Dankaur",
district:"Gautam Buddha Nagar",
owner:"Gram Sabha",
area:"210 Ha",
category:"Agricultural Buffer",
risk:"Medium",
status:"Planning"
},
{
id:"GLIS-UP-404",
location:"Greater Noida West",
district:"Gautam Buddha Nagar",
owner:"GNIDA",
area:"320 Ha",
category:"Commercial Utility",
risk:"Low",
status:"Prime"
}
];









// ===============================
// Analytics Data
// ===============================


export const analyticsData = [

{
name:"Government Land",
value:45
},

{
name:"Private Land",
value:25
},

{
name:"Forest Area",
value:20
},

{
name:"Mining Zone",
value:10
}

];









// ===============================
// AI Prediction Data
// ===============================


export const predictionData = {


accuracy:"94.7%",


confidence:"91%",


risk:"Low",


result:"Highly Suitable For Development"


};









// ===============================
// Reports Data
// ===============================


export const reportsData = [
  {
    title: "National Land Suitability Assessment",
    date: "July 2026",
    status: "Completed",
  },
  {
    title: "Environmental Hydrology Clearances",
    date: "August 2026",
    status: "Pending Review",
  },
  {
    title: "High-Risk Encroachment Summary",
    date: "September 2026",
    status: "Completed",
  },
  {
    title: "Quarterly Mining Zone Expansion Report",
    date: "October 2026",
    status: "Active",
  },
];









// ===============================
// Alert Data
// ===============================


export const alertsData = [

{
msg:"Restricted forest activity detected",
type:"High",
color:"red"
},


{
msg:"Mining zone boundary updated",
type:"Medium",
color:"yellow"
},


{
msg:"Government land verified",
type:"Low",
color:"green"
}

];