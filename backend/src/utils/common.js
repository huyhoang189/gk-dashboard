const fs = require("fs");

const readFile = async (filePath, keyword = "", properties = []) => {
  try {
    const datas = await fs.readFileSync(filePath, "utf8");
    const entries = datas.split("\n");

    // const filterData = filterObjectsByProperties(
    //   entries.map((e) => ({ ...matchingData(e) })),
    //   keyword,
    //   properties
    // );
    const list = entries.map((e) => ({ ...matchingData(e) }));

    return filterObjectsByProperties(list, keyword, properties);
  } catch (e) {
    console.log("error when read file : ", e);
    return [];
  }
};

const filterObjectsByProperties = (data, keyword, properties) => {
  //   console.log(keyword, !Array.isArray(properties));
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  if (
    !keyword ||
    !properties ||
    !Array.isArray(properties) ||
    properties.length === 0
  ) {
    return data;
  }

  return data.filter((item) => {
    return properties.some((prop) => {
      const value = item[prop] && item[prop].toString();
      return value.includes(keyword);
    });
  });
};

const matchingData = (item) => {
  const tempData = {
    timestamp: "",
    ip_source: "",
    url: "",
    request: "",
    HTTPStatus: "",
    raw: item,
  };

  try {
    const regexPattern =
      /(\d+\.\d+\.\d+\.\d+) - - \[([^\]]+)\] "(\w+) ([^"]+)" (\d+) (\d+) "([^"]+)" "([^"]+)"/;
    const match = item.match(regexPattern);

    if (match) {
      const [
        ,
        ip_source,
        timestamp,
        requestMethod,
        requestUrl,
        httpStatus,
        responseSize,
        referrer,
        userAgent,
      ] = match;

      // Extracted information
      const extractedData = {
        ...tempData,
        timestamp,
        ip_source,
        url: referrer,
        request: `${requestMethod} ${requestUrl}`,
        HTTPStatus: parseInt(httpStatus, 10),
      };

      return extractedData;
    } else {
      console.error("Log entry does not match the expected pattern.");
      return tempData;
    }
  } catch (error) {
    return tempData;
  }
};

const getDataWithPaging = async (
  pathName,
  pageNumber = 1,
  pageSize = 10,
  keyword = "",
  properties = []
) => {
  try {
    const entries = await readFile(pathName, keyword, properties);

    const totalPages = Math.ceil(entries.length / pageSize);

    if (pageNumber < 1 || pageNumber > totalPages) {
      return {
        totalPages,
        currentPage: pageNumber,
        entries: [],
        totalItem: 0,
      };
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageEntries = entries.slice(startIndex, endIndex);

    return {
      totalPages,
      currentPage: pageNumber,
      entries: pageEntries,
      totalItem: entries.length,
    };
  } catch (error) {
    return {
      totalPages: 0,
      currentPage: 0,
      entries: [],
      totalItem: 0,
    };
  }
};

module.exports = {
  getDataWithPaging,
};
