import Header from "../components/Header";
import { FilterMenu } from "../components/FilterMenu";
import { Search } from "../components/Search";
import { ButtonsPanel } from "../components/ButtonsPanel";
import { BadgesCategories } from "../components/BadgesCategories";
import { SectionPosts } from "../components/SectionPosts";

export default function Home() {
  return (
    <>
      <Header variant="primary" />
      <main class="flex flex-col gap-2 px-4 md:px-0 pb-4">
        <section class="flex w-full justify-between space-y-4 flex-wrap ">
          <div class="flex w-full flex-col gap-4">
            <div class="flex flex-wrap gap-4 sm:justify-between ">
              <ButtonsPanel />
              <Search />
            </div>
            <FilterMenu />
          </div>

          <BadgesCategories />
        </section>
        <SectionPosts />
      </main>
    </>
  );
}
