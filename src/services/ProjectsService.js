import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firestore/firestore.config";

const COLLECTIONS = {
  works: "works",
  images: "images",
};

export default {
  async fetchProjects() {
    try {
      const worksRef = collection(db, COLLECTIONS.works);
      const projectSnap = await getDocs(worksRef);

      const projectsData = await Promise.all(
        projectSnap.docs.map(async (project) => {
          const data = { id: project.id, ...project.data() };
          const imagesSnap = await getDocs(
            collection(
              db,
              `${COLLECTIONS.works}/${data.id}/${COLLECTIONS.images}`
            )
          );
          const images = imagesSnap.docs.map((image) => {
            return { id: image.id, ...image.data() };
          });
          return { ...data, images };
        })
      );
      return projectsData;
    } catch (e) {
      throw new Error("500");
    }
  },
};
