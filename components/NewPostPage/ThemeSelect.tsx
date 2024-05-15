import React, { Dispatch, SetStateAction } from "react";
import { Select } from "antd";
import type { ITagData } from "@/app/forum/page";

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const ThemeSelect: React.FC<{
  tagsData: ITagData[];
  setTheme: Dispatch<SetStateAction<string>>;
}> = ({ tagsData, setTheme }) => {
  const onChange = (value: string) => {
    setTheme(value);
  };

  const onSearch = (value: string) => {};

  const themeSelectOptions = tagsData?.flatMap((tag) =>
    tag.ForumThemes.map((theme) => ({
      value: theme.id.toString(),
      label: theme.theme,
    }))
  );
  return (
    <Select
      className="w-96"
      showSearch
      placeholder="Оберіть тему посту"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={themeSelectOptions}
    />
  );
};

export default ThemeSelect;
