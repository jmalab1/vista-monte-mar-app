export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  posted: string;
  stayType: string;
  quote: string;
  translated?: boolean;
  featured?: boolean;
  hostResponse?: {
    date: string;
    text: string;
  };
};

export const reviews: Review[] = [
  {
    id: 'laura-2026-02',
    name: 'Laura',
    location: 'Ashwaubenon, Wisconsin',
    rating: 5,
    posted: 'February 2026',
    stayType: 'Stayed a few nights',
    quote:
      'Clean. Pristine. Serene. After spending several days in San Jose, we were tired, sick of being dirty and desperate for peace and quiet. This brand new condo was a haven of tranquility. Steps away from nature or restaurants, we loved the pool and the rooftop patio; I only wish we could have stayed longer. 10/10.',
    featured: true,
  },
  {
    id: 'suzanne-laval-2026-03',
    name: 'Suzanne',
    location: 'Laval, Canada',
    rating: 5,
    posted: 'March 2026',
    stayType: 'Stayed over a week',
    quote:
      "We really enjoyed our stay at Dianne's apartment. The proximity to grocery stores, shops, beach and restaurants, all walking distance, was very convenient. We appreciated Dianne's warm welcome and quick response time to our requests. The apartment was very comfortable, clean and well equipped for our comfort. In conclusion we loved our stay and absolutely recommend it. We will likely come back. Thanks again for everything Dianne. Pura Vida.",
  },
  {
    id: 'suzanne-alameda-2026-02',
    name: 'Suzanne',
    location: 'Alameda, California',
    rating: 5,
    posted: 'February 2026',
    stayType: 'Stayed a few nights',
    quote:
      "Dianne's condo was tastefully decorated and welcoming. The location was great because Jaco can be loud in spots downtown but this condo is in an area that is quiet yet still walkable to beach and downtown. Highly recommend.",
  },
  {
    id: 'olga-1-day-ago',
    name: 'Olga',
    location: 'Randolph, New Jersey',
    rating: 5,
    posted: 'May 2026',
    stayType: 'Stayed a few nights',
    quote:
      'Beautiful place, great location very close to Jaco beach, excellent security and outstanding communication with the host. Highly recommend this place for anyone who is planning to visit Jaco Costa Rica.',
  },
  {
    id: 'stan-2026-02',
    name: 'Stan',
    location: 'Mindemoya, Canada',
    rating: 5,
    posted: 'February 2026',
    stayType: 'Stayed over a week',
    quote:
      'We had a fantastic four week stay at Dianne Grace\'s condo. The condo was very well equipped with high end furnishing as well as a well equipped kitchen. Dianne was also a fantastic host. All instructions were well presented in her Welcome binder, including places to shop, eat, bank and get medical aid. Dianne was also readily available with a response within one hour to answer questions. Truly the very best Airbnb stay and experience that we have had. This is why we have already booked another month at her condo for 2027.',
    featured: true,
  },
  {
    id: 'julie-2026-01',
    name: 'Julie',
    location: 'Belgrade, Montana',
    rating: 5,
    posted: 'January 2026',
    stayType: 'Stayed over a week',
    quote:
      'Beautiful condo in a perfect location. I loved having the back of the condo building with the mountain view. Birds everywhere, friendly gate staff, and a quick walk to the beach. The pool and workout sections were awesome. Condo is gorgeous and we felt super comfy and posh. Hosts were sweet and we felt very taken care of. Cannot wait to come back.',
  },
  {
    id: 'noy-2025-11',
    name: 'Noy',
    location: 'San Carlos, Costa Rica',
    rating: 5,
    posted: 'November 2025',
    stayType: 'Stayed over a week',
    quote:
      "This was our second long term stay. The home feels like home, the location is prime for Jaco peace, and the host is amazing. We loved watching toucans and lapas from the condo, and sunsets over Jaco Bay from the rooftop.",
  },
  {
    id: 'corey-montreal-5-days-ago',
    name: 'Corey',
    location: 'Montreal, Canada',
    rating: 5,
    posted: 'May 2026',
    stayType: 'Stayed over a week',
    quote:
      'I had a fantastic stay here. The condo is exactly what you hope for when traveling. It is beautifully appointed, spotless, and thoughtfully designed. The location is excellent with convenient access to everything nearby, yet it still feels peaceful and relaxing. Communication was smooth, welcoming, and incredibly helpful throughout. Highly recommended. I would happily stay here again.',
    featured: true,
  },
  {
    id: 'noy-2025-10',
    name: 'Noy',
    location: 'San Carlos, Costa Rica',
    rating: 5,
    posted: 'October 2025',
    stayType: 'Stayed over a week',
    quote:
      "One of the best Airbnb experiences I've ever had. We felt right at home here. The location is perfect, very close to all you need yet far from city noise. We loved the rooftop deck for epic sunsets over Jaco Bay. You will not find a better host.",
  },
  {
    id: 'chasell-2025-08',
    name: 'Chasell',
    location: 'Atlanta, Georgia',
    rating: 5,
    posted: 'August 2025',
    stayType: 'Stayed a few nights',
    quote:
      'This place was amazing for our needs. Great view, close to restaurants and beach, and easy to catch a taxi. The off season rain made for restful nights. Dianne was very responsive. Would definitely recommend when visiting Jaco.',
  },
  {
    id: 'tori-2025-05',
    name: 'Tori',
    location: 'Miramar, Florida',
    rating: 5,
    posted: 'May 2025',
    stayType: 'Stayed a few nights',
    quote:
      "I absolutely loved Dianne's place. It was the perfect birthday trip. Property was beautiful and very clean, Dianne was responsive and helpful throughout, and the location was perfect next to supermarkets, restaurants, and stores.",
  },
  {
    id: 'colleen-3-weeks-ago',
    name: 'Colleen',
    location: 'Airbnb guest',
    rating: 5,
    posted: 'April 2026',
    stayType: 'Stayed a few nights',
    quote: 'Great stay and excellent host. We loved our location and the staff on property. Highly recommend for the Jaco area.',
  },
  {
    id: 'jill-2025-12',
    name: 'Jill',
    location: 'Baltimore, Maryland',
    rating: 5,
    posted: 'December 2025',
    stayType: 'Stayed a few nights',
    quote:
      "We had a wonderful stay at Dianne's condo in Jaco. Great place, close to everything, and an easy day drive to Manuel Antonio. Highly recommend.",
  },
  {
    id: 'charlotte-2025-09',
    name: 'Charlotte',
    location: 'Airbnb guest',
    rating: 5,
    posted: 'September 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Dianne Grace is a wonderful host. The place was absolutely gorgeous and looked exactly like the photos. Communication was excellent and the list of things to do was very helpful.',
  },
  {
    id: 'cindy-2025-06',
    name: 'Cindy',
    location: 'Las Vegas, Nevada',
    rating: 5,
    posted: 'June 2025',
    stayType: 'Stayed a few nights',
    quote:
      'It was beautiful. The property felt brand new and we had the pool to ourselves. The condo itself felt like home. It is about 10 minutes from downtown, which made it convenient.',
  },
  {
    id: 'chrys-2025-08',
    name: 'Chrys',
    location: 'Valley Stream, New York',
    rating: 5,
    posted: 'August 2025',
    stayType: 'Stayed about a week',
    quote:
      'One of the best vacation rentals I have stayed at. Very secure community, very modern and aesthetically pleasing. If I return to Jaco, I will certainly stay in this unit.',
  },
  {
    id: 'johana-3-weeks-ago',
    name: 'Johana',
    location: 'Alajuelita, Costa Rica',
    rating: 5,
    posted: 'April 2026',
    stayType: 'Stayed a few nights',
    quote:
      'The accommodation was exactly as shown in the pictures. The apartment is very well maintained, stylish, clean, and cool. It has all listed amenities, feels safe, and has parking. Overall, it was a very comfortable stay and we felt right at home.',
    translated: true,
  },
  {
    id: 'fred-2026-03',
    name: 'Fred',
    location: 'Willowbrook, Illinois',
    rating: 5,
    posted: 'March 2026',
    stayType: 'Stayed a few nights',
    quote: 'Very attentive and the unit was perfect.',
  },
  {
    id: 'gil-2025-08',
    name: 'Gil',
    location: 'Chicago, Illinois',
    rating: 5,
    posted: 'August 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Very clean and tidy place. Security gate was a nice touch to feel safe. Everything was as described, Dianne was communicative, and check in and out was a breeze.',
  },
  {
    id: 'james-2025-08',
    name: 'James',
    location: 'Airbnb guest',
    rating: 5,
    posted: 'August 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Our time at this Airbnb outside main Jaco was a peaceful, refreshing experience. Quiet, surrounded by nature, and still close enough to enjoy town. Dianne made us feel welcome and cared for with thoughtful communication. The home was spotless, cozy, and had everything we needed.',
  },
  {
    id: 'michael-2025-07',
    name: 'Michael',
    location: 'Miami, Florida',
    rating: 5,
    posted: 'July 2025',
    stayType: 'Stayed with kids',
    quote:
      'Amazing place. Almost wanted to stay inside as much as outside. Hosts were great. On our list of permanent spots to book when we return.',
  },
  {
    id: 'tyah-2025-07',
    name: 'Tyah',
    location: 'Austin, Texas',
    rating: 5,
    posted: 'July 2025',
    stayType: 'Stayed a few nights',
    quote: 'We absolutely loved the stay. My friend and I found it was near a lot of places as well.',
  },
  {
    id: 'nina-2025-07',
    name: 'Nina',
    location: 'San Diego, California',
    rating: 5,
    posted: 'July 2025',
    stayType: 'Stayed a few nights',
    quote: 'This condo was perfect for our Jaco trip. Such a comfortable stay in a great location.',
  },
  {
    id: 'margaret-2025-03',
    name: 'Margaret',
    location: 'Airbnb guest',
    rating: 5,
    posted: 'March 2025',
    stayType: 'Stayed about a week',
    quote:
      "If we could give 10 stars out of 5 we would. The apartment is beautiful with everything you need and more. Newly built condominium with secure entry. Very modern and stylish. Quiet and easy walk to town and beach. Dianne is an amazing host.",
  },
  {
    id: 'linda-2025-03',
    name: 'Linda',
    location: 'Blue Springs, Nebraska',
    rating: 5,
    posted: 'March 2025',
    stayType: 'Stayed a few nights',
    quote:
      'We had a wonderful stay. The property was immaculate, comfortable, and secure. The location is quiet and peaceful. Dianne and Jayson were great hosts and very responsive with area recommendations.',
  },
  {
    id: 'amber-2025-05',
    name: 'Amber',
    location: 'Ogallala, Nebraska',
    rating: 5,
    posted: 'May 2025',
    stayType: 'Stayed about a week',
    quote: 'Great stay and great host. Thank you.',
  },
  {
    id: 'jill-david-2025-04',
    name: 'Jill & David',
    location: 'Baltimore, Maryland',
    rating: 5,
    posted: 'April 2025',
    stayType: 'Stayed a few nights',
    quote:
      "This was our first time back in Costa Rica since having kids, and the condo was perfect for our family of 4. Very comfortable beds, beach accessories, and great recommendations. Dianne was quick to respond. We cannot wait to come back.",
  },
  {
    id: 'corey-san-antonio-2025-03',
    name: 'Corey',
    location: 'San Antonio, Texas',
    rating: 5,
    posted: 'March 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Everything was wonderful. The location is great, quiet, and safe. The room is immaculate, modern, and has everything we needed. Beds were extremely comfortable. Easy check in and out. Highly recommended.',
  },
  {
    id: 'sara-2025-12',
    name: 'Sara',
    location: 'Airbnb guest',
    rating: 5,
    posted: 'December 2025',
    stayType: 'Stayed a few nights',
    quote:
      'The place was great. Everything was very clean and the views are beautiful. The host was extremely responsive to all our requests. I highly recommend it.',
    translated: true,
  },
  {
    id: 'maylin-2025-07',
    name: 'Maylin',
    location: 'Heredia, Costa Rica',
    rating: 5,
    posted: 'July 2025',
    stayType: 'Stayed with kids',
    quote:
      'The place is beautiful, comfortable and clean. It exceeded our expectations, we had an amazing time, and communication with Dianne was excellent and accurate. We will definitely return.',
    translated: true,
  },
  {
    id: 'amanda-2025-04',
    name: 'Amanda',
    location: 'Linden, Canada',
    rating: 5,
    posted: 'April 2025',
    stayType: 'Stayed with kids',
    quote:
      'The house was well stocked and absolutely beautiful. The beach was just a short walk away and the pool was lovely. Would recommend to anyone staying in the area.',
  },
  {
    id: 'alex-2025-03',
    name: 'Alex',
    location: 'New York, United States',
    rating: 3,
    posted: 'March 2025',
    stayType: 'Stayed about a week',
    quote:
      'Overall the property is fantastic, but there was a difficult and stressful check in experience related to security gate registration for a guest. The host addressed it and acknowledged the issue with HOA and guards.',
    hostResponse: {
      date: 'March 2025',
      text: 'Thanks for the transparency and feedback, Alex. We are sorry the guards gave you such a hard time. We escalated this with HOA administration immediately so this does not happen again.',
    },
  },
  {
    id: 'sabrina-2025-04',
    name: 'Sabrina',
    location: 'Elmont, New York',
    rating: 5,
    posted: 'April 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Extremely accommodating and thoughtfully prepared for everything we needed. Perfect location a few blocks from the beach, great recommendations, and responsive hosts. Kitchen was well stocked and the stay felt smooth and relaxing.',
  },
  {
    id: 'seyris-2025-08',
    name: 'Seyris',
    location: 'Alfaro Ruiz, Costa Rica',
    rating: 4,
    posted: 'August 2025',
    stayType: 'Stayed with kids',
    quote: 'Very nice and clean.',
    translated: true,
  },
  {
    id: 'cesar-2025-04',
    name: 'Cesar',
    location: 'San Jose, Costa Rica',
    rating: 5,
    posted: 'April 2025',
    stayType: 'Stayed a few nights',
    quote:
      'Amazing apartment, just like the pictures and description. Everything was wonderful. Very comfortable beds and great rest. I would definitely come back and recommend this apartment.',
    translated: true,
  },
];

export const reviewSummary = {
  totalReviews: 35,
  averageRating: 4.91,
  fiveStarPercent: 94,
};

export const reviewThemes = [
  'Spotless and modern interiors',
  'Quiet location with walkable access',
  'Responsive and thoughtful host support',
  'Safe community with strong security',
  'Great fit for families and long stays',
];
