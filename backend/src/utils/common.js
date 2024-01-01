const fs = require("fs");

const readFile = async (
  filePath,
  keyword = "",
  properties = [],
  type = "SUCCESS"
) => {
  try {
    const datas = await fs.readFileSync(filePath, "utf8");
    const entries = datas.split("\n");

    const list =
      type === "SUCCESS"
        ? entries.map((e) => ({ ...matchingDataSucces(e) }))
        : entries.map((e) => ({ ...matchingDataError(e) }));

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

      return value && value.includes(keyword);
    });
  });
};

const matchingDataSucces = (item) => {
  const tempData = {
    timestamp: "",
    ip_source: "",
    url: "",
    request: "",
    HTTPStatus: "",
    responseSize: 0,
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
        responseSize,
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

const matchingDataError = (item) => {
  const tempData = {
    timestamp: "",
    error: "",
    client: "",
    server: "",
    request: "",
    raw: item,
  };

  try {
    const regexPattern =
      /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[([^]+)\] (\d+#\d+): \*(\d+) ([^]+), client: ([^]+), server: ([^]+), request: "([^]+)", host: "([^]+)"/;
    const match = item.match(regexPattern);
    if (match) {
      const timestamp = match[1];
      const error = match[2];
      const code = match[3];
      const callNumber = match[4];
      const errorDescription = match[5];
      const client = match[6];
      const server = match[7];
      const request = match[8];
      const host = match[9];
      // Extracted information
      const extractedData = {
        ...tempData,
        timestamp,
        error: `${error} ${code} ${callNumber} ${errorDescription}`,
        client,
        server,
        request,
      };

      return extractedData;
    } else {
      console.error("Log entry does not match the expected pattern.");
      return tempData;
    }
  } catch (error) {
    console.log(error);
    return tempData;
  }
};

const getDataWithPaging = async (
  pathName,
  pageNumber = 1,
  pageSize = 10,
  keyword = "",
  properties = [],
  type = "SUCCESS"
) => {
  try {
    const entries = await readFile(pathName, keyword, properties, type);

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

const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const isValidIP = (ip) => {
  return ipRegex.test(ip);
};

module.exports = {
  getDataWithPaging,
  isValidIP,
};
