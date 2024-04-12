import Header from "../components/Header";
import { FilterMenu } from "../components/FilterMenu";
import CardPost from "../components/CardPost";
import Badge from "../components/Badge";
import { Search } from "../components/Search";
import { ButtonsPanel } from "../components/ButtonsPanel";

export default function Home() {
  return (
    <>
      <Header variant="primary" />
      <main class="flex flex-col gap-2">
        <section class="flex justify-between gap-4 flex-wrap px-4 md:px-0">
          <div class="flex w-full flex-col gap-4">
            <div class="flex flex-wrap gap-4 sm:justify-between ">
              <ButtonsPanel />
              <Search />
            </div>
            <FilterMenu />
          </div>

          <div class="flex flex-wrap gap-2">
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
            <Badge name="CSS" withIcon />
          </div>
        </section>
        <section class="flex flex-col gap-4">
          <a
            href="/post/1"
            class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
          >
            <CardPost />
          </a>
          <a
            href="/post/1"
            class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
          >
            <CardPost />
          </a>
          <a
            href="/post/1"
            class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
          >
            <CardPost />
          </a>
          <a
            href="/post/1"
            class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded"
          >
            <CardPost />
          </a>
        </section>
      </main>
    </>
  );
}
