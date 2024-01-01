import { DATE_FORMAT } from "../commons/constants";

export const convertDateToString = (
  datetime,
  format = DATE_FORMAT.DDMMYYYY
) => {
  const date = new Date(datetime);

  return date.toLocaleDateString(format) !== "Invalid Date"
    ? date.toLocaleDateString(format)
    : datetime;
};

export const renderBreakLine = (strs) => {
  const items = strs.split("//");
  return (
    <span style={{ margin: 0, padding: 0 }}>
      {items.map((e) => (
        <p style={{ margin: 0, padding: 0 }}>{e}</p>
      ))}
    </span>
  );
};

export const renderVNDMoney = (value) => {
  // Convert the input value to a number (if it's a string)
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Check if the value is a valid number
  if (isNaN(numericValue)) {
    return "Invalid input";
  }

  const formattedValue = numericValue
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Ensure no decimal places
    })
    .replace(/\./g, ","); // Replace the period with a comma

  return formattedValue.replace(/₫/, "VNĐ");
};

export const generateYear = (min, max) => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + max;
  const minYear = currentYear - min;
  const yearArray = [];
  if (maxYear < minYear) {
    return yearArray;
  }

  for (let year = maxYear; year >= minYear; year--) {
    yearArray.push(year);
  }

  return yearArray;
};

export const addKeyForDataSource = (array) => {
  let dataSource = [];
  array.map((e, i) => {
    dataSource.push({
      ...e,
      key: i + 1,
    });
  });
  return dataSource;
};

export const toLowerCaseNonAccentVietnamese = (str) => {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str.replaceAll(" ", "-");
};

// This function keeps the casing unchanged for str, then perform the conversion
export const toNonAccentVietnamese = (str) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const convertToTree = (arr) => {
  let tree = [];
  let regions = {};

  // init region item
  arr.forEach((item) => {
    if (item.NavalRegion) {
      const { ID, ...region } = item.NavalRegion;
      regions[ID] = {
        id: ID,
        title: region.Name,
        type: "REGION",
        children: [],
      };
    }
  });

  // Populate squadrons under their respective region
  arr.forEach((item) => {
    if (item.Squadron && item.Squadron.Id) {
      const { Id, ...squadron } = item.Squadron;
      regions[item.NavalRegion.ID].children.push({
        id: Id,
        title: <span style={{ marginLeft: 20 }}>{squadron.Name}</span>,
        type: "SQUADRON",
        children: [],
      });
    }
  });

  // Populate flotillias under their respective squadrons
  arr.forEach((item) => {
    if (item.Squadron && item.Squadron.Id) {
      regions[item.NavalRegion.ID].children.forEach((element, index) => {
        if (element.type === "SQUADRON") {
          if (item.Squadron.Id === element.id) {
            regions[item.NavalRegion.ID].children[index].children.push({
              id: item.Id,
              title: <span style={{ marginLeft: 40 }}>{item.Name}</span>,
              type: "FLOTILLA",
              children: [],
            });
          }
        }
      });
    }
  });

  // Populate flotillias under their respective region
  arr.forEach((item) => {
    if (!item.Squadron) {
      const { Id, ...flotillia } = item;
      regions[item.NavalRegion.ID].children.push({
        id: Id,
        title: <span style={{ marginLeft: 20 }}>{flotillia.Name}</span>,
        type: "FLOTILLIA",
        children: [],
      });
    }
  });

  // convert map to array like tree
  Object.keys(regions).forEach((regionId) => {
    const region = regions[regionId];
    tree.push(region);
  });

  return addKeys(tree.sort((a, b) => a.title.localeCompare(b.title)));
};

const addKeys = (data, parentKey = "1") => {
  return data.map((item, index) => {
    const key = `${parentKey}-${index + 1}`;
    const title = item.title;
    const type = item.type;
    const id = item.id;
    return {
      id,
      key,
      title,
      children: item.children ? addKeys(item.children, key) : [],
      type,
    };
  });
};

// convert list object to array with first row is properties of object
export const convertListToArray = (list) => {
  try {
    if (list?.length === 0) {
      return [];
    }

    // Extract property names from the first object
    const headers = Object.keys(list[0]);

    // Create an array with the first row as property names
    const result = [headers];

    // Populate the array with values
    list.forEach((obj) => {
      const row = headers.map((header) => obj[header]);
      result.push(row);
    });

    return result;
  } catch (error) {}
};

export const getRandomColor = () => {
  // Generate random values for red, green, and blue (RGB)
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  // Create the RGB color string
  const randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

  return randomColor;
};

export const formatDateTimeString = (dateTimeString) => {
  const isoDateTime = new Date(dateTimeString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Đặt giờ 24h
  };

  const formatter = new Intl.DateTimeFormat("en", options);

  return formatter.format(isoDateTime);
};

export const convertXML = (
  data,
  tagName,
  arrayElementTag = "element",
  spaces = 0
) => {
  const tag = tagName
    .replace(/[^_a-zA-Z 0-9:\-\.]/g, "")
    .replace(/^([ 0-9-:\-\.]|(xml))+/i, "")
    .replace(/ +/g, "-");

  const indentSpaces = Array(spaces + 1).join(" ");

  if (data === null || data === undefined) {
    return `${indentSpaces}<${tag} />`;
  }

  const content =
    Object.prototype.toString.call(data) === "[object Array]"
      ? data
          .map((item) =>
            convertXML(item, arrayElementTag, arrayElementTag, spaces + 2)
          )
          .join("\n")
      : typeof data === "object"
      ? Object.keys(data)
          .map((key) => [key, data[key]])
          .map(([key, value]) =>
            convertXML(value, key, arrayElementTag, spaces + 2)
          )
          .join("\n")
      : indentSpaces +
        "  " +
        String(data).replace(/([<>&])/g, (_, $1) => {
          switch ($1) {
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case "&":
              return "&amp;";
            default:
              return "";
          }
        });

  const contentWithWrapper = `${indentSpaces}<${tag}>
          ${content}
          ${indentSpaces}</${tag}>`;

  return contentWithWrapper;
};

export const convertDateFormatLog = (inputDate) => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const dateParts = inputDate.match(
    /(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) (-\d{4})/
  );
  if (!dateParts) {
    return "Invalid Date";
  }

  const day = dateParts[1];
  const month = months[dateParts[2]];
  const year = dateParts[3];
  const hours = dateParts[4];
  const minutes = dateParts[5];
  const seconds = dateParts[6];

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
