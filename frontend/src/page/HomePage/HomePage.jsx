import ApartList from "../../components/ApartList/ApartList";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.container}>
      <ApartList />
    </section>
  );
}
