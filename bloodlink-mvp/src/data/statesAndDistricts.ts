export interface DistrictInfo {
  name: string;
  lat: number;
  lng: number;
  samplePins: string[];
  subdivisions: string[];
}

export interface StateInfo {
  name: string;
  code: string;
  districts: DistrictInfo[];
}

export const indianStatesAndDistricts: StateInfo[] = [
  {
    name: "Karnataka",
    code: "KA",
    districts: [
      { name: "Bengaluru Urban", lat: 12.9716, lng: 77.5946, samplePins: ["560001", "560034", "560068"], subdivisions: ["Majestic", "Koramangala", "Yelahanka", "Whitefield"] },
      { name: "Bengaluru Rural", lat: 13.2847, lng: 77.5542, samplePins: ["562110", "562123"], subdivisions: ["Doddaballapura", "Devanahalli", "Hosakote", "Nelamangala"] },
      { name: "Mysuru", lat: 12.2958, lng: 76.6394, samplePins: ["570001", "571180"], subdivisions: ["Mysuru City", "Nanjangud", "Hunsur", "T. Narasipura", "K.R. Nagar"] },
      { name: "Dharwad (Hubballi)", lat: 15.3647, lng: 75.1240, samplePins: ["580020", "580001"], subdivisions: ["Hubballi City", "Dharwad Town", "Navalgund", "Kalghatgi"] },
      { name: "Kalaburagi", lat: 17.3297, lng: 76.8343, samplePins: ["585101", "585102"], subdivisions: ["Kalaburagi", "Sedam", "Aland", "Chittapur", "Afzalpur"] },
      { name: "Tumakuru", lat: 13.3409, lng: 77.1010, samplePins: ["572101", "572130"], subdivisions: ["Tumakuru Town", "Tiptur", "Sira", "Gubbi", "Kunigal"] },
      { name: "Belagavi", lat: 15.8497, lng: 74.4977, samplePins: ["590001", "591201"], subdivisions: ["Belagavi City", "Gokak", "Chikkodi", "Athani", "Bailhongal"] },
      { name: "Dakshina Kannada (Mangaluru)", lat: 12.9141, lng: 74.8560, samplePins: ["575001", "574201"], subdivisions: ["Mangaluru City", "Bantwal", "Puttur", "Belthangady", "Sullia"] },
      { name: "Ballari", lat: 15.1394, lng: 76.9214, samplePins: ["583101", "583115"], subdivisions: ["Ballari City", "Siruguppa", "Sandur", "Kampli"] },
      { name: "Shivamogga", lat: 13.9299, lng: 75.5681, samplePins: ["577201", "577401"], subdivisions: ["Shivamogga City", "Bhadravati", "Sagara", "Shikaripura", "Thirthahalli"] },
      { name: "Chikkamagaluru", lat: 13.3161, lng: 75.7720, samplePins: ["577101", "577548"], subdivisions: ["Chikkamagaluru", "Kadur Town", "Tarikere", "Mudigere", "Sringeri"] }
    ]
  },
  {
    name: "Tamil Nadu",
    code: "TN",
    districts: [
      { name: "Chennai", lat: 13.0827, lng: 80.2707, samplePins: ["600001", "600034", "600028"], subdivisions: ["Central", "T. Nagar", "Adyar", "Anna Nagar", "Tambaram"] },
      { name: "Coimbatore", lat: 11.0168, lng: 76.9558, samplePins: ["641001", "641018"], subdivisions: ["Gandhipuram", "Pollachi", "Mettupalayam", "Sulur"] },
      { name: "Madurai", lat: 9.9252, lng: 78.1198, samplePins: ["625001", "625020"], subdivisions: ["Madurai City", "Melur", "Thirumangalam", "Usilampatti"] },
      { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047, samplePins: ["620001", "620017"], subdivisions: ["Trichy Town", "Srirangam", "Manapparai", "Thuraiyur"] },
      { name: "Salem", lat: 11.6643, lng: 78.1460, samplePins: ["636001", "636007"], subdivisions: ["Salem Town", "Attur", "Mettur", "Sankari"] },
      { name: "Thoothukudi", lat: 8.7642, lng: 78.1348, samplePins: ["628001", "628501"], subdivisions: ["Thoothukudi Port", "Kovilpatti Town", "Tiruchendur", "Ettayapuram"] },
      { name: "Vellore", lat: 12.9165, lng: 79.1325, samplePins: ["632001", "632004"], subdivisions: ["Vellore City", "Katpadi", "Gudiyatham", "Anaicut"] }
    ]
  },
  {
    name: "Kerala",
    code: "KL",
    districts: [
      { name: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366, samplePins: ["695001", "695011"], subdivisions: ["Statue", "Neyyattinkara", "Attingal", "Nedumangad"] },
      { name: "Ernakulam (Kochi)", lat: 9.9312, lng: 76.2673, samplePins: ["682001", "682016"], subdivisions: ["Fort Kochi", "Aluva", "Angamaly", "Kothamangalam"] },
      { name: "Kozhikode", lat: 11.2588, lng: 75.7804, samplePins: ["673001", "673004"], subdivisions: ["Kozhikode Town", "Vadakara", "Koyilandy", "Thamarassery"] },
      { name: "Wayanad", lat: 11.6854, lng: 76.1320, samplePins: ["673121", "673592"], subdivisions: ["Kalpetta", "Mananthavady", "Sulthan Bathery", "Meppadi Village"] },
      { name: "Malappuram", lat: 11.0732, lng: 76.0740, samplePins: ["676505", "676101"], subdivisions: ["Malappuram Town", "Tirur", "Perinthalmanna", "Manjeri"] },
      { name: "Thrissur", lat: 10.5276, lng: 76.2144, samplePins: ["680001", "680101"], subdivisions: ["Thrissur City", "Chalakudy", "Kodungallur", "Guruvayur"] }
    ]
  },
  {
    name: "Andhra Pradesh",
    code: "AP",
    districts: [
      { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185, samplePins: ["530001", "530026"], subdivisions: ["Vizag Port", "Gajuwaka", "Anakapalle", "Bheemunipatnam"] },
      { name: "NTR (Vijayawada)", lat: 16.5062, lng: 80.6480, samplePins: ["520001", "520010"], subdivisions: ["Vijayawada City", "Mylavaram", "Tiruvuru", "Jaggayyapeta"] },
      { name: "Guntur", lat: 16.3067, lng: 80.4365, samplePins: ["522001", "522002"], subdivisions: ["Guntur City", "Tenali", "Mangalagiri", "Ponnur"] },
      { name: "Tirupati", lat: 13.6288, lng: 79.4192, samplePins: ["517501", "517644"], subdivisions: ["Tirupati Town", "Srikalahasti", "Chandragiri", "Venkatagiri"] },
      { name: "Kurnool", lat: 15.8281, lng: 78.0373, samplePins: ["518001", "518002"], subdivisions: ["Kurnool City", "Adoni", "Yemmiganur", "Dhone"] }
    ]
  },
  {
    name: "Telangana",
    code: "TG",
    districts: [
      { name: "Hyderabad", lat: 17.3850, lng: 78.4867, samplePins: ["500001", "500028", "500081"], subdivisions: ["Secunderabad", "Charminar", "Kukatpally", "Gachibowli"] },
      { name: "Warangal", lat: 17.9689, lng: 79.5941, samplePins: ["506001", "506002"], subdivisions: ["Hanamkonda", "Warangal City", "Narsampet", "Parkal"] },
      { name: "Karimnagar", lat: 18.4386, lng: 79.1288, samplePins: ["505001", "505002"], subdivisions: ["Karimnagar Town", "Huzurabad", "Choppadandi", "Manakondur"] },
      { name: "Nizamabad", lat: 18.6725, lng: 78.0941, samplePins: ["503001", "503002"], subdivisions: ["Nizamabad City", "Bodhan", "Armoor", "Bheemgal"] },
      { name: "Khammam", lat: 17.2473, lng: 80.1514, samplePins: ["507001", "507002"], subdivisions: ["Khammam Town", "Sathupalli", "Madhira", "Wyra"] }
    ]
  },
  {
    name: "Maharashtra",
    code: "MH",
    districts: [
      { name: "Mumbai", lat: 18.9220, lng: 72.8347, samplePins: ["400001", "400012", "400050"], subdivisions: ["South Mumbai", "Dadar", "Bandra", "Andheri", "Borivali"] },
      { name: "Pune", lat: 18.5204, lng: 73.8567, samplePins: ["411001", "411014"], subdivisions: ["Shivajinagar", "Kothrud", "Hadapsar", "Baramati", "Shirur"] },
      { name: "Nagpur", lat: 21.1458, lng: 79.0882, samplePins: ["440001", "440010"], subdivisions: ["Sitabuldi", "Dharampeth", "Ramtek", "Katol", "Umred"] },
      { name: "Nashik", lat: 19.9975, lng: 73.7898, samplePins: ["422001", "422005"], subdivisions: ["Panchavati", "Nashik Road", "Sinnar", "Malegaon", "Trimbak"] },
      { name: "Chhatrapati Sambhajinagar", lat: 19.8762, lng: 75.3433, samplePins: ["431001", "431005"], subdivisions: ["CIDCO", "Aurangpura", "Paithan", "Vaijapur", "Gangapur"] },
      { name: "Kolhapur", lat: 16.7050, lng: 74.2433, samplePins: ["416001", "416012"], subdivisions: ["Kolhapur City", "Ichalkaranji", "Gadhinglaj", "Karveer"] }
    ]
  },
  {
    name: "Goa",
    code: "GA",
    districts: [
      { name: "North Goa", lat: 15.4909, lng: 73.8278, samplePins: ["403001", "403507"], subdivisions: ["Panaji", "Mapusa", "Bicholim", "Pernem", "Ponda"] },
      { name: "South Goa", lat: 15.2736, lng: 73.9582, samplePins: ["403601", "403706"], subdivisions: ["Margao", "Vasco da Gama", "Quepem", "Curchorem", "Canacona"] }
    ]
  },
  {
    name: "Gujarat",
    code: "GJ",
    districts: [
      { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, samplePins: ["380001", "380015"], subdivisions: ["Navrangpura", "Maninagar", "Vastrapur", "Sanand", "Dholka"] },
      { name: "Surat", lat: 21.1702, lng: 72.8311, samplePins: ["395001", "395003"], subdivisions: ["Varachha", "Adajan", "Rander", "Bardoli", "Mandvi"] },
      { name: "Vadodara", lat: 22.3072, lng: 73.1812, samplePins: ["390001", "390007"], subdivisions: ["Sayajigunj", "Alkapuri", "Makarpura", "Padra", "Karjan"] },
      { name: "Rajkot", lat: 22.3039, lng: 70.8022, samplePins: ["360001", "360005"], subdivisions: ["Rajkot City", "Gondal", "Jetpur", "Dhoraji", "Jasdan"] },
      { name: "Kutch", lat: 23.2420, lng: 69.6669, samplePins: ["370001", "370205"], subdivisions: ["Bhuj", "Gandhidham", "Mandvi Port", "Anjar", "Nakhatrana"] }
    ]
  },
  {
    name: "Rajasthan",
    code: "RJ",
    districts: [
      { name: "Jaipur", lat: 26.9124, lng: 75.7873, samplePins: ["302001", "302015"], subdivisions: ["Pink City", "Mansarovar", "Vaishali Nagar", "Chomu", "Sanganer"] },
      { name: "Jodhpur", lat: 26.2389, lng: 73.0243, samplePins: ["342001", "342003"], subdivisions: ["Ratanada", "Sardarpura", "Mandore", "Bilara", "Phalodi"] },
      { name: "Udaipur", lat: 24.5854, lng: 73.7125, samplePins: ["313001", "313002"], subdivisions: ["City Centre", "Fatehpura", "Mavli", "Salumber", "Vallabhnagar"] },
      { name: "Kota", lat: 25.2138, lng: 75.8648, samplePins: ["324001", "324005"], subdivisions: ["Gumanpura", "Vigyan Nagar", "Ramganj Mandi", "Sangod"] },
      { name: "Jhunjhunu", lat: 28.1289, lng: 75.3995, samplePins: ["333001", "333704"], subdivisions: ["Jhunjhunu Town", "Mandawa Village", "Nawalgarh", "Khetri"] }
    ]
  },
  {
    name: "Madhya Pradesh",
    code: "MP",
    districts: [
      { name: "Bhopal", lat: 23.2599, lng: 77.4126, samplePins: ["462001", "462016"], subdivisions: ["MP Nagar", "Arera Colony", "Kolar", "Berasia"] },
      { name: "Indore", lat: 22.7196, lng: 75.8577, samplePins: ["452001", "452010"], subdivisions: ["Vijay Nagar", "Palasia", "Rau", "Mhow", "Sanwer"] },
      { name: "Gwalior", lat: 26.2183, lng: 78.1828, samplePins: ["474001", "474006"], subdivisions: ["Lashkar", "Morar", "Thatipur", "Dabra", "Bhitarwar"] },
      { name: "Jabalpur", lat: 23.1815, lng: 79.9864, samplePins: ["482001", "482002"], subdivisions: ["Civil Lines", "Wright Town", "Sihora", "Patan", "Panagar"] }
    ]
  },
  {
    name: "Uttar Pradesh",
    code: "UP",
    districts: [
      { name: "Lucknow", lat: 26.8467, lng: 80.9462, samplePins: ["226001", "226010"], subdivisions: ["Hazratganj", "Gomti Nagar", "Alambagh", "Malihabad", "Bakshi Ka Talab"] },
      { name: "Varanasi", lat: 25.3176, lng: 82.9739, samplePins: ["221001", "221005"], subdivisions: ["Cantonment", "Lanka", "Sarnath Village", "Pindra", "Shivpur"] },
      { name: "Gorakhpur", lat: 26.7606, lng: 83.3732, samplePins: ["273001", "273015"], subdivisions: ["Golghar", "Medical College Area", "Sahjanwa", "Campierganj"] },
      { name: "Kanpur Nagar", lat: 26.4499, lng: 80.3319, samplePins: ["208001", "208024"], subdivisions: ["Mall Road", "Kalyanpur", "Govind Nagar", "Ghatampur", "Bilhaur"] },
      { name: "Prayagraj", lat: 25.4358, lng: 81.8463, samplePins: ["211001", "211002"], subdivisions: ["Civil Lines", "Katra", "Naini", "Phulpur", "Koraon"] }
    ]
  },
  {
    name: "Bihar",
    code: "BR",
    districts: [
      { name: "Patna", lat: 25.5941, lng: 85.1376, samplePins: ["800001", "800020"], subdivisions: ["Kankarbagh", "Boring Road", "Danapur", "Phulwari Sharif", "Fatwah"] },
      { name: "Gaya", lat: 24.7914, lng: 85.0002, samplePins: ["823001", "824231"], subdivisions: ["Gaya City", "Bodh Gaya Town", "Tekari", "Sherghati", "Wazirganj"] },
      { name: "Muzaffarpur", lat: 26.1209, lng: 85.3647, samplePins: ["842001", "842002"], subdivisions: ["Saraiyaganj", "Mithanpura", "Kanti", "Motipur", "Aurai"] },
      { name: "Bhagalpur", lat: 25.2425, lng: 86.9842, samplePins: ["812001", "812002"], subdivisions: ["Bhagalpur City", "Naugachhia", "Kahalgaon", "Sultanganj"] }
    ]
  },
  {
    name: "Jharkhand",
    code: "JH",
    districts: [
      { name: "Ranchi", lat: 23.3441, lng: 85.3096, samplePins: ["834001", "834002"], subdivisions: ["Main Road", "Doranda", "Hatia", "Kanke", "Ratu"] },
      { name: "East Singhbhum (Jamshedpur)", lat: 22.8046, lng: 86.2029, samplePins: ["831001", "831005"], subdivisions: ["Bistupur", "Sakchi", "Golmuri", "Ghatshila", "Bahargora"] },
      { name: "Dhanbad", lat: 23.7957, lng: 86.4304, samplePins: ["826001", "826004"], subdivisions: ["Bank More", "Jharia", "Sindri", "Govindpur", "Nirsa"] }
    ]
  },
  {
    name: "West Bengal",
    code: "WB",
    districts: [
      { name: "Kolkata", lat: 22.5726, lng: 88.3639, samplePins: ["700001", "700029"], subdivisions: ["Park Street", "Salt Lake", "Garia", "Shyambazar", "Behala"] },
      { name: "Darjeeling (Siliguri)", lat: 26.7271, lng: 88.3953, samplePins: ["734001", "734005"], subdivisions: ["Siliguri Town", "Darjeeling Hills", "Kurseong", "Mirik", "Matigara"] },
      { name: "Howrah", lat: 22.5958, lng: 88.2636, samplePins: ["711101", "711106"], subdivisions: ["Howrah Station", "Shibpur", "Bally", "Uluberia", "Amta"] },
      { name: "Murshidabad", lat: 24.1759, lng: 88.2802, samplePins: ["742101", "742149"], subdivisions: ["Baharampur", "Lalgola", "Kandi", "Jangipur", "Jiaganj"] }
    ]
  },
  {
    name: "Odisha",
    code: "OD",
    districts: [
      { name: "Khordha (Bhubaneswar)", lat: 20.2961, lng: 85.8245, samplePins: ["751001", "751024"], subdivisions: ["Saheed Nagar", "Nayapalli", "Khandagiri", "Jatni", "Khordha Town"] },
      { name: "Cuttack", lat: 20.4625, lng: 85.8828, samplePins: ["753001", "753003"], subdivisions: ["Badambadi", "Choudwar", "Athagarh", "Banki", "Salipur"] },
      { name: "Sundargarh (Rourkela)", lat: 22.2604, lng: 84.8536, samplePins: ["769001", "769012"], subdivisions: ["Panposh", "Civil Township", "Sundargarh Town", "Rajgangpur"] },
      { name: "Koraput", lat: 18.8135, lng: 82.7118, samplePins: ["764020", "764055"], subdivisions: ["Koraput Town", "Jeypore", "Sunabeda", "Kotpad", "Damanjodi"] }
    ]
  },
  {
    name: "Assam",
    code: "AS",
    districts: [
      { name: "Kamrup Metropolitan (Guwahati)", lat: 26.1445, lng: 91.7362, samplePins: ["781001", "781005"], subdivisions: ["Paltan Bazaar", "Dispur", "Chandmari", "Jalukbari"] },
      { name: "Dibrugarh", lat: 27.4728, lng: 94.9120, samplePins: ["786001", "786003"], subdivisions: ["Dibrugarh Town", "Chabua", "Naharkatia", "Moranhat"] },
      { name: "Jorhat", lat: 26.7509, lng: 94.2037, samplePins: ["785001", "785008"], subdivisions: ["Jorhat City", "Titabor", "Majuli Ferry Point", "Teok"] },
      { name: "Cachar (Silchar)", lat: 24.8333, lng: 92.7789, samplePins: ["788001", "788015"], subdivisions: ["Silchar Town", "Sonai", "Lakhipur", "Dholai"] }
    ]
  },
  {
    name: "Meghalaya",
    code: "ML",
    districts: [
      { name: "East Khasi Hills (Shillong)", lat: 25.5788, lng: 91.8933, samplePins: ["793001", "793003"], subdivisions: ["Police Bazar", "Laitumkhrah", "Sohra (Cherrapunji)", "Mawsynram"] },
      { name: "West Garo Hills (Tura)", lat: 25.5141, lng: 90.2023, samplePins: ["794001", "794101"], subdivisions: ["Tura Town", "Dalu", "Dadenggre", "Rongram"] }
    ]
  },
  {
    name: "Manipur",
    code: "MN",
    districts: [
      { name: "Imphal West", lat: 24.8170, lng: 93.9368, samplePins: ["795001", "795004"], subdivisions: ["Thangal Bazar", "Lamphelpat", "Wangoi", "Lamsang"] },
      { name: "Churachandpur", lat: 24.3333, lng: 93.6833, samplePins: ["795128", "795133"], subdivisions: ["Lamka Town", "Tuibong", "Singngat", "Thanlon"] }
    ]
  },
  {
    name: "Mizoram",
    code: "MZ",
    districts: [
      { name: "Aizawl", lat: 23.7271, lng: 92.7176, samplePins: ["796001", "796005"], subdivisions: ["Zarkawt", "Khatla", "Bawngkawn", "Durtlang"] },
      { name: "Lunglei", lat: 22.8890, lng: 92.7410, samplePins: ["796701", "796710"], subdivisions: ["Venglai", "Bazar Veng", "Hnahthial", "Tlabung"] }
    ]
  },
  {
    name: "Nagaland",
    code: "NL",
    districts: [
      { name: "Kohima", lat: 25.6751, lng: 94.1086, samplePins: ["797001", "797002"], subdivisions: ["Midland", "High School Colony", "Chiephobozou", "Tseminyu"] },
      { name: "Dimapur", lat: 25.9093, lng: 93.7266, samplePins: ["797112", "797116"], subdivisions: ["City Centre", "Chumukedima", "Purana Bazar", "Medziphema"] }
    ]
  },
  {
    name: "Tripura",
    code: "TR",
    districts: [
      { name: "West Tripura (Agartala)", lat: 23.8315, lng: 91.2868, samplePins: ["799001", "799006"], subdivisions: ["Banamalipur", "Radhanagar", "Mohanpur", "Jirania"] },
      { name: "Gomati", lat: 23.5350, lng: 91.4880, samplePins: ["799114", "799120"], subdivisions: ["Udaipur", "Amarpur", "Karbook"] }
    ]
  },
  {
    name: "Arunachal Pradesh",
    code: "AR",
    districts: [
      { name: "Papum Pare (Itanagar)", lat: 27.0844, lng: 93.6053, samplePins: ["791111", "791110"], subdivisions: ["Ganga", "Naharlagun", "Doimukh", "Sagalee"] },
      { name: "West Kameng", lat: 27.2644, lng: 92.4184, samplePins: ["790001", "790101"], subdivisions: ["Bomdila", "Rupa", "Dirang", "Singchung"] }
    ]
  },
  {
    name: "Sikkim",
    code: "SK",
    districts: [
      { name: "Gangtok", lat: 27.3389, lng: 88.6065, samplePins: ["737101", "737102"], subdivisions: ["MG Marg", "Deorali", "Tadong", "Ranipool"] },
      { name: "Namchi", lat: 27.1667, lng: 88.3667, samplePins: ["737126", "737121"], subdivisions: ["Namchi Bazaar", "Jorethang", "Ravangla"] }
    ]
  },
  {
    name: "Punjab",
    code: "PB",
    districts: [
      { name: "Ludhiana", lat: 30.9010, lng: 75.8573, samplePins: ["141001", "141008"], subdivisions: ["Model Town", "Civil Lines", "Khanna", "Jagraon", "Samrala"] },
      { name: "Amritsar", lat: 31.6340, lng: 74.8723, samplePins: ["143001", "143002"], subdivisions: ["Golden Temple Vicinity", "Ranjit Avenue", "Ajnala", "Attari", "Majitha"] },
      { name: "Jalandhar", lat: 31.3260, lng: 75.5762, samplePins: ["144001", "144008"], subdivisions: ["Model Town", "Rama Mandi", "Nakodar", "Phillaur", "Kartarpur"] }
    ]
  },
  {
    name: "Haryana",
    code: "HR",
    districts: [
      { name: "Gurugram", lat: 28.4595, lng: 77.0266, samplePins: ["122001", "122018"], subdivisions: ["Cyber City", "Sohna Road", "Pataudi", "Farrukhnagar"] },
      { name: "Faridabad", lat: 28.4089, lng: 77.3178, samplePins: ["121001", "121004"], subdivisions: ["NIT", "Old Faridabad", "Ballabgarh", "Tigaon"] },
      { name: "Panipat", lat: 29.3909, lng: 76.9635, samplePins: ["132103", "132106"], subdivisions: ["Model Town", "Samalkha", "Israna", "Madlauda"] }
    ]
  },
  {
    name: "Himachal Pradesh",
    code: "HP",
    districts: [
      { name: "Shimla", lat: 31.1048, lng: 77.1734, samplePins: ["171001", "171004"], subdivisions: ["The Mall", "Sanjauli", "Kasumpti", "Theog", "Rampur"] },
      { name: "Kangra (Dharamshala)", lat: 32.2190, lng: 76.3234, samplePins: ["176215", "176001"], subdivisions: ["McLeod Ganj", "Dharamshala Town", "Palampur", "Kangra Town", "Nurpur"] },
      { name: "Mandi", lat: 31.7087, lng: 76.9320, samplePins: ["175001", "175024"], subdivisions: ["Mandi Town", "Sundernagar", "Sarkaghat", "Jogindernagar"] }
    ]
  },
  {
    name: "Uttarakhand",
    code: "UK",
    districts: [
      { name: "Dehradun", lat: 30.3165, lng: 78.0322, samplePins: ["248001", "248006"], subdivisions: ["Rajpur Road", "Clement Town", "Rishikesh", "Mussoorie", "Vikasnagar"] },
      { name: "Haridwar", lat: 29.9457, lng: 78.1642, samplePins: ["249401", "249407"], subdivisions: ["Har Ki Pauri", "Jwalapur", "Roorkee", "Laksar", "Bhagwanpur"] },
      { name: "Nainital (Haldwani)", lat: 29.2183, lng: 79.5130, samplePins: ["263139", "263001"], subdivisions: ["Haldwani Town", "Nainital Lake", "Ramnagar", "Kaladhungi"] }
    ]
  },
  {
    name: "Delhi",
    code: "DL",
    districts: [
      { name: "Central Delhi", lat: 28.6448, lng: 77.2167, samplePins: ["110001", "110002"], subdivisions: ["Connaught Place", "Daryaganj", "Karol Bagh", "Paharganj"] },
      { name: "South Delhi", lat: 28.5355, lng: 77.1990, samplePins: ["110016", "110049"], subdivisions: ["Hauz Khas", "Saket", "Green Park", "Mehrauli"] },
      { name: "North Delhi", lat: 28.7041, lng: 77.1025, samplePins: ["110007", "110009"], subdivisions: ["Civil Lines", "Model Town", "Narela", "Alipur Village"] },
      { name: "East Delhi", lat: 28.6280, lng: 77.2789, samplePins: ["110091", "110092"], subdivisions: ["Mayur Vihar", "Preet Vihar", "Laxmi Nagar", "Gandhi Nagar"] }
    ]
  },
  {
    name: "Jammu and Kashmir",
    code: "JK",
    districts: [
      { name: "Srinagar", lat: 34.0837, lng: 74.7973, samplePins: ["190001", "190008"], subdivisions: ["Lal Chowk", "Dalgate", "Soura", "Hazratbal", "Batamaloo"] },
      { name: "Jammu", lat: 32.7266, lng: 74.8570, samplePins: ["180001", "180004"], subdivisions: ["Gandhi Nagar", "Old City", "R.S. Pura", "Akhnoor", "Bishnah"] },
      { name: "Anantnag", lat: 33.7311, lng: 75.1522, samplePins: ["192101", "192125"], subdivisions: ["Anantnag Town", "Bijbehara", "Pahalgam", "Dooru", "Kokernag"] }
    ]
  },
  {
    name: "Ladakh",
    code: "LA",
    districts: [
      { name: "Leh", lat: 34.1526, lng: 77.5771, samplePins: ["194101", "194201"], subdivisions: ["Leh Main Market", "Choglamsar", "Nubra Valley", "Diskit", "Nyoma"] },
      { name: "Kargil", lat: 34.5539, lng: 76.1349, samplePins: ["194103", "194105"], subdivisions: ["Kargil Town", "Drass", "Sankoo", "Zanskar/Padum"] }
    ]
  },
  {
    name: "Chhattisgarh",
    code: "CG",
    districts: [
      { name: "Raipur", lat: 21.2514, lng: 81.6296, samplePins: ["492001", "492006"], subdivisions: ["Pandri", "Telibandha", "Naya Raipur", "Abhanpur", "Tilda"] },
      { name: "Bilaspur", lat: 22.0797, lng: 82.1409, samplePins: ["495001", "495004"], subdivisions: ["Civil Lines", "Torwa", "Kota", "Masturi", "Takhatpur"] },
      { name: "Durg (Bhilai)", lat: 21.1904, lng: 81.2849, samplePins: ["490001", "491001"], subdivisions: ["Bhilai Steel City", "Durg Town", "Patan", "Kumhari"] },
      { name: "Bastar (Jagdalpur)", lat: 19.0748, lng: 82.0098, samplePins: ["494001", "494005"], subdivisions: ["Jagdalpur", "Bastanar", "Lohandiguda", "Tokapal"] }
    ]
  }
];

export const allBloodGroups: ("All" | import("../types").BloodGroup)[] = [
  "All",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

export function getDistrictCoordinates(stateName: string, districtName: string): { lat: number; lng: number } | null {
  const state = indianStatesAndDistricts.find(s => s.name.toLowerCase() === stateName.toLowerCase());
  if (!state) return null;
  const dist = state.districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  if (!dist) return null;
  return { lat: dist.lat, lng: dist.lng };
}
