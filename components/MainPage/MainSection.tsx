import { Typography } from "antd";

const { Title } = Typography;

const MainSection = () => {
  return (
    <div className="md:w-full sm:w-full lg:w-[65%] h-full bg-black text-white p-4">
      <Title style={{ color: "white", textAlign: "center" }} level={3}>
        Welcome home, український гік!
      </Title>
      <p>
        Тут ти знайдеш цікаві новини зі світу IT, корисні поради та розв'язання
        проблем, пов'язаних з програмуванням. Приєднуйся до нашої спільноти
        прямо зараз і розширюй свої знання з інформаційних технологій. Пам'ятай
        - який би рівень знань ти не мав, для когось ТИ САМ вже експерт.
        Поділися з початківцем своєю мудрістю, Йода...
      </p>
      <Title
        style={{ color: "white", textAlign: "center", margin: "10px" }}
        level={3}
      >
        З чого почати:
      </Title>
    </div>
  );
};

export default MainSection;
