import { create } from "zustand";
import { getAllArticel } from "../api/article";
import { getDetailArticle } from "../api/article";
const useArticle = create((set) => ({
  articleData: [],
 articleDetailData:[],
 ArticleTotalElement: "",
  isLoadingArticlelData: false,
  fetchArticlelrData: async () => {
    try {
      set({ isLoadingArticlelData: true });
      const response = await getAllArticel();
      if (response && response.status === 200) {
        set({ articleData: response?.data?.Data?.ListData || [] });
        set({ isLoadingArticlelData: response?.data?.totalElements || "" });
      }
      set({ isLoadingArticlelData: false });
    } catch (error) {
      set({ isLoadingArticlelData: false });
      console.error("Error fetching data:", error);
    }
  },
  fetchArticleDetail: async (Id) => {
    try {
      const response = await getDetailArticle(Id);
      if (response && response.status === 200) {
        set({ articleDetailData: response.data.Data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
export default useArticle;
