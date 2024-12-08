import { Message } from "./types.module";

const input: Message[] = [
    { date: "2021-06-21", message: "message D" },
    { date: "2020-06-18", message: "message A" },
    { date: "2021-06-20", message: "message C" },
    { date: "2020-06-19", message: "message B" }
  ];

  const groupDataByYear = (data: Message[]): Map<number, Message[]> => {
    const groupedData = new Map();

    data.forEach(item => {
        const year = new Date(item.date).getFullYear();
        if(groupedData.has(year)) {
            const presentData = groupedData.get(year);
            presentData.push(item);
            groupedData.set(year, presentData);
        } else {
            groupedData.set(year, [item]);
        }
    });
    return groupedData;
  }

export {input, groupDataByYear};
  