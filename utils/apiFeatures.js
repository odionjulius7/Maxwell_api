// Sort, Filter, Select, Pagination
class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludeFields = ["sort", "page", "limit", "field"];
    excludeFields.forEach((el) => delete queryObject[el]);

    /* It then converts the queryObject to a JSON string and replaces certain keywords (e.g., "gte," "gt," "lte," "lt") with their MongoDB equivalents (e.g., $gte, $gt, $lte, $lt). */
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr)); // e.g await DocCat.find().sort(JSON.parse(queryStr))
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.query.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy); // e.g DocCat.find().sort(sortBy)
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.query.sort.split(",").join(" ");
      this.query = this.query.select(fields); // e.g await DocCat.find().select(fields)
    } else {
      this.query = this.query.sort("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = apiFeatures;
