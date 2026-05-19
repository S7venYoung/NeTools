// 高德地图去广告 - Quantumult X
// Converted from kelee.one Loon plugin / RuCu6 amap.js.

const url = $request.url;
let body = $response.body || "";

try {
  const obj = JSON.parse(body);

  const del = (target, keys) => {
    if (!target || typeof target !== "object") return;
    keys.forEach((key) => delete target[key]);
  };

  const emptyDataList = (node) => {
    if (node?.dataList?.length > 0) node.dataList = [];
  };

  if (url.includes("/aos/perception/publicTravel/beforeNavi")) {
    if (obj?.data?.common_data?.bus_plan_bottom_event?.data?.length > 0) obj.data.common_data.bus_plan_bottom_event.data = [];
    if (obj?.data?.common_data?.bus_plan_bottom_tips?.data?.length > 0) obj.data.common_data.bus_plan_bottom_tips.data = [];
    if (obj?.data?.common_data?.bus_plan_segment_event?.data?.length > 0) obj.data.common_data.bus_plan_segment_event.data = [];
    if (obj?.data?.front_end?.assistant?.length > 0) obj.data.front_end.assistant = [];
  } else if (url.includes("/boss/car/order/content_info")) {
    emptyDataList(obj?.data?.lubanData?.benefitsCard);
    emptyDataList(obj?.data?.lubanData?.popup);
    emptyDataList(obj?.data?.lubanData?.skin);
    emptyDataList(obj?.data?.matrixData?.c3DiversionCard);
    emptyDataList(obj?.data?.matrixData?.DiversionCard);
  } else if (url.includes("/boss/order_web/friendly_information")) {
    del(obj?.data?.["105"], ["banners", "carouselTips", "integratedBanners", "integratedTips", "skins", "skinAndTips", "tips"]);
  } else if (url.includes("/bus/plan/integrate")) {
    if (obj?.data?.banner_lists?.data?.length > 0) obj.data.banner_lists.data = [];
    if (obj?.data?.banner_lists?.tips?.length > 0) obj.data.banner_lists.tips = [];
    if (obj?.data?.mixed_plans?.data?.taxiPlans?.length > 0) obj.data.mixed_plans.data.taxiPlans = [];
  } else if (url.includes("/c3frontend/af-hotel/page/main")) {
    const modules = obj?.data?.modules;
    del(modules, ["CouponPortalCard", "CouponWidget", "recommended_list"]);
    const card = modules?.user_filter_card?.data;
    if (card?.search_button_data?.rightbgText) delete card.search_button_data.rightbgText;
    del(card, ["banner", "bannerList", "service_data", "sug_items_data"]);
  } else if (url.includes("/c3frontend/af-launch/page/main")) {
    if (obj?.data?.modules?.C1EndNaviEngine?.data) obj.data.modules.C1EndNaviEngine.data = {};
  } else if (url.includes("/c3frontend/af-nearby/nearby")) {
    if (obj?.data?.modules?.banner) obj.data.modules.banner = {};
    if (obj?.data?.modules?.contentPoster) obj.data.modules.contentPoster = {};
  } else if (url.includes("/faas/amap-navigation/card-service-plan-home")) {
    if (obj?.data?.children?.length > 0) obj.data.children = obj.data.children.filter((item) => !Object.prototype.hasOwnProperty.call(item, "schema"));
  } else if (url.includes("/faas/amap-navigation/main-page")) {
    if (obj?.data?.cardList?.length > 0) {
      obj.data.cardList = obj.data.cardList.filter((item) => ["ContinueNavigationCard", "FrequentLocation", "LoginCard"].includes(item?.dataKey));
    }
    if (obj?.data?.mapBizList?.length > 0) {
      obj.data.mapBizList = obj.data.mapBizList.filter((item) => item?.dataKey === "FindCarVirtualCard");
    }
  } else if (url.includes("/perception/drive/routeInfo")) {
    if (obj?.data?.tbt?.event?.length > 0) obj.data.tbt.event = obj.data.tbt.event.filter((item) => !/ads-\d+/.test(item?.dynamic_id_s));
    if (obj?.data?.front_end?.assistant) delete obj.data.front_end.assistant;
    if (obj?.data?.front_end?.guide_tips?.length > 0) obj.data.front_end.guide_tips = obj.data.front_end.guide_tips.filter((item) => item?.biz_type !== "music");
    if (obj?.data?.front_end?.download?.length > 0) obj.data.front_end.download = obj.data.front_end.download.filter((item) => !/ads-\d+/.test(item?.dynamic_id_s));
  } else if (url.includes("/perception/drive/routePlan")) {
    del(obj?.data?.front_end, ["assistant", "global_guide_data", "route_search", "start_button_tips"]);
    if (obj?.data?.tbt?.event?.length > 0) obj.data.tbt.event = obj.data.tbt.event.filter((item) => !/ads-\d+/.test(item?.dynamic_id_s));
    if (obj?.data?.front_end?.download?.length > 0) obj.data.front_end.download = obj.data.front_end.download.filter((item) => !/ads-\d+/.test(item?.dynamic_id_s));
  } else if (url.includes("/promotion-web/resource")) {
    del(obj?.data, ["alpha", "banner", "bravo", "bubble", "charlie", "icon", "other", "popup", "push", "tips"]);
  } else if (url.includes("/shield/dsp/profile/index/nodefaasv3")) {
    del(obj?.data, ["tipData", "memberInfo", "topMixedCard"]);
    if (obj?.data?.cardList?.length > 0) obj.data.cardList = obj.data.cardList.filter((item) => item?.dataKey === "MyOrderCard");
  } else if (url.includes("/shield/frogserver/aocs/updatable/")) {
    const keys = [
      "Naviendpage_Searchwords", "SplashScreenControl", "TipsTaxiButton", "amapCoin", "favorites_info", "feedback_banner",
      "footprint", "his_input_tip", "home_business_position_config", "hotel_activity", "hotel_fillin_opt", "hotel_loop",
      "hotel_tipsicon", "hotsaleConfig", "landing_page_info", "map_weather_switch", "maplayers", "navi_end",
      "nearby_business_popup", "nearby_map_entry_guide", "nearby_map_pull_down_guide", "operation_layer", "poi_rec",
      "preword", "route_banner", "routeresult_banner", "search_homepage", "search_keyword", "search_moni", "search_perf",
      "search_poi_recommend", "search_service_adcode", "search_word", "sportsGroupConfig", "sportsHealthConfig",
      "sportsHomeConfig", "sportsRouteConfig", "sportsTaskConfig", "sports_walk", "small_biz_b2b_kb", "small_biz_case",
      "small_biz_fun", "small_biz_index", "small_biz_news", "splashscreen", "splashview_config", "sur_bar", "taxi_activity",
      "testflight_adiu", "tf_remind", "tips_bar_black_list", "vip"
    ];
    keys.forEach((key) => {
      if (obj?.data?.[key]) obj.data[key] = { status: 1, version: "", value: "" };
    });
  } else if (url.includes("/shield/search/common/coupon/info")) {
    if (obj?.data) obj.data = {};
  } else if (url.includes("/shield/search/nearbyrec_smart")) {
    if (obj?.data?.modules?.length > 0) obj.data.modules = obj.data.modules.filter((item) => ["head", "search_hot_words", "feed_rec"].includes(item));
  } else if (url.includes("/shield/search/poi/detail")) {
    const modules = obj?.data?.modules;
    if (modules?.combineReviews?.data?.write_comment) delete modules.combineReviews.data.write_comment;
    del(modules, [
      "CouponBanner", "CouponPush", "adStoreBigBannerModule", "adv_compliance_info", "adv_gift", "bigListBizRec",
      "bottomDescription", "brand_service", "brand_shop_bar", "businessQualifications", "carServiceCard", "checkIn",
      "check_in", "cityCardFeed", "city_discount", "claim", "co_branded_card", "collector_guide", "commonAiAgent",
      "commonGoodsShelf", "commonHkfMiniPortal", "common_coupon_bar", "common_coupon_card", "comprehensiveEditEntrance",
      "contributor", "cpt_service_shop", "dayTripList", "discount_commodity", "divergentRecommendModule",
      "enhanceCustomerServiceFixedBottom", "enhanceCustomerServicePoiModule", "everyOneToSee", "feedback",
      "first_surround_estate_tab", "footer_tel_button", "ggc_entry", "hkfMiniPortal", "hkfCalendarRecommend",
      "horizontalGoodsShelf", "hospital_strategy", "hotPlay", "hot_new_house_estate", "hot_shop", "hotelCoupon",
      "hotelList", "hotelMustRead", "houseAgentService", "houseList", "houseOfficeBrandIntroduction", "houseOfficeInfo",
      "houseOfficeNotice", "houseOfficeService", "houseShelf", "house_apart_info", "house_buying_agent", "house_coupon",
      "house_cp_clues", "house_cpt_coupon", "house_cpt_grab", "house_price", "house_price_v2", "house_rent_sale_agency",
      "image_banner", "kaMarketingCampaign", "kaProductMixServiceShelf", "ka_not_enter", "legSameIndustryRecEntrance",
      "legal_document", "listBizRec_1", "listBizRec_2", "matrix_banner", "merchantSettlement", "membership",
      "mini_hook_shelf", "movie_info", "multi_page_anchor", "nearbyGoodCar", "nearbyRecommendModule", "nearby_house",
      "nearby_new_house_estate", "nearby_office_estate", "nearby_old_sell_estate", "nearby_play_rec", "newGuest",
      "newRelatedRecommends", "new_operation_banner", "newsellhouse", "officerenthouse", "officesellhouse",
      "official_account", "official_account_hospital", "oldsellhouse", "operation_banner", "operator_card",
      "packageShelf", "parentBizRec", "parentPoiRecEntrance", "platformCustomerCommonModule",
      "platformCustomerComplianceInfo", "poiDetailBottomBar", "poiDetailBottomBarOperation", "poiDetailCommonConfig",
      "poiDetailNewBeltCardV2", "poiDetailNewBeltV2", "poiDetailWaterFeed", "poiDetailWaterFeedTitle", "poster_banner",
      "portal_entrance", "quickLink", "quickLinksPortal", "relatedRecommends", "renthouse", "rentSaleHouse",
      "rentsaleagencyv2", "rentsaleagencyv3", "rentsalehouse", "residentialOwners", "retainInfo", "reviews",
      "sameIndustryRecommendModule", "sameIndustry2RecommendModule", "scenic_coupon", "scenic_filter",
      "scenic_lifeservices", "scenic_mustplay", "scenic_play_guide", "scenic_recommend", "scenic_voice", "searchPlaMap",
      "second_surround_estate_tab", "service_shop", "shopBaseCase", "shopStdActivity", "shopStructGift",
      "shoppingMallEvent", "similarShelfRecommend", "similarShopRecommend", "smallListBizRec", "smallOrListBizRec",
      "societyPublicExperience", "subscription", "surroundHouseTab", "surroundOldSellHouse", "surroundRentHouse",
      "surround_facility", "surround_facility_new", "surround_house_tab", "surround_oldsellhouse", "surround_renthouse",
      "surround_rentoffice", "surround_selloffice", "thirdparty_info", "travelGuideRec", "uploadBar", "upload_bar",
      "verification", "waistRecEntrance", "waterFallFeed", "waterFallFeedTitle", "yellowPageAdRecommendModule"
    ]);
  } else if (url.includes("/shield/search_bff/hotword")) {
    if (obj?.data?.headerHotWord?.length > 0) obj.data.headerHotWord = [];
  } else if (url.includes("/shield/search_poi/search/sp") || url.includes("/shield/search_poi/mps")) {
    const list = obj?.data?.list_data?.content?.[0] || obj?.data?.modules?.not_parse_result?.data?.list_data?.content?.[0];
    if (list) {
      del(list?.hookInfo?.data, ["header", "house_info"]);
      del(list?.map_bottom_bar, ["hotel"]);
      del(list?.poi?.item_info?.tips_bottombar_button, ["hotel"]);
      del(list, ["tips_operation_info"]);
      del(list?.bottom?.bottombar_button, ["hotel"]);
      if (["SearchCardBrand", "NearbyGroupBuy", "ImageBanner"].includes(list?.card?.card_id)) delete list.card;
    }
    const poi = obj?.data?.district?.poi_list?.[0];
    del(poi, ["transportation", "feed_rec_tab"]);
    const data = obj?.data?.modules?.list_data?.data;
    if (data?.content?.length > 0) data.content = data.content.filter((item) => !["brandAdCard", "toplist_al"].includes(item?.item_type));
  } else if (url.includes("/shield/search_poi/sug")) {
    const blockedDatatype = new Set(["12"]);
    const blockedResultType = new Set(["ad", "poi_ad", "toplist"]);
    const blockedTaskTag = new Set(["ad", "exct_query_sug_merge_theme", "query_sug_merge_theme", "sp"]);
    const keepTip = (item) => !blockedDatatype.has(item?.tip?.datatype_spec) && !blockedResultType.has(item?.tip?.result_type) && !blockedTaskTag.has(item?.tip?.task_tag);
    if (obj?.tip_list?.length > 0) obj.tip_list = obj.tip_list.filter(keepTip);
    if (obj?.city_list?.length > 0) {
      obj.city_list.forEach((city) => {
        if (city?.tip_list?.length > 0) city.tip_list = city.tip_list.filter(keepTip);
      });
    }
  } else if (url.includes("/shield/search_poi/tips_operation_location")) {
    if (obj?.data?.coupon) delete obj.data.coupon;
    del(obj?.data?.modules, ["belt", "common_float_bar", "common_image_banner", "coupon_discount_float_bar", "coupon_float_bar", "discount_coupon", "image_cover_bar", "mood_coupon_banner", "operation_brand", "promotion_wrap_card", "tips_top_banner"]);
  } else if (url.includes("/valueadded/alimama/splash_screen")) {
    if (obj?.data?.ad?.length > 0) {
      obj.data.ad.forEach((item) => {
        if (item?.set?.setting) item.set.setting.display_time = 0;
        if (item?.creative?.[0]) {
          item.creative[0].start_time = 3818332800;
          item.creative[0].end_time = 3818419199;
        }
      });
    }
  }

  body = JSON.stringify(obj);
} catch (e) {}

$done({ body });
