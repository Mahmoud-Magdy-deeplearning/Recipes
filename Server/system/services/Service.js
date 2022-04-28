const mongoose = require("mongoose");
const autoBind = require("auto-bind");
const { MongooseQueryParser } = require("mongoose-query-parser");
const { HttpResponse } = require("../helpers/HttpResponse");

const parser = new MongooseQueryParser();

class Service {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getAll(query) {
    let filters;

    let skip;

    let limit;

    let sortBy;

    let select;

    let populate;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        throw new Error("Not able to generate mongoose id with content");
      }
    }

    try {
      const parsed = parser.parse(query);

      skip = parsed.skip ? Number(parsed.skip) : 0;
      limit = parsed.limit ? Number(parsed.limit) : 0;
      sortBy = parsed.sort ? parsed.sort : {};
      filters = parsed.filter;
      select = parsed.select;
      populate = parsed.populate;
      let newObj = populate;

      if (populate) {
        newObj = populate.map((item) => {
          const ret = {};

          ret.path = item.path;
          if (item.select) {
            const arr = item.select.split(" populate ");

            ret.select = arr[0];
            if (arr.length > 1) {
              ret.populate = [];

              for (let i = 1; arr.length > i; i++) {
                const res = {};

                let tmp = res;
                const splited = arr[i].split(" ");

                for (let j = 0; j < splited.length; j++) {
                  tmp.path = splited[j];
                  if (j != splited.length - 1) {
                    tmp.populate = {};
                    tmp = tmp.populate;
                  }
                }
                ret.populate.push(res);
              }
            }
          }
          return ret;
        });
      }

      const items = await this.model
        .find(filters, select)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .populate(newObj);


      return new HttpResponse(items, { totalCount: items.length });
    } catch (errors) {
      throw errors;
    }
  }

  async get(id) {
    try {
      const item = await this.model.findById(id);

      if (!item) {
        const error = new Error("Item not found");

        error.statusCode = 404;
        throw error;
      }

      return new HttpResponse(item);
    } catch (errors) {
      throw errors;
    }
  }

  async insert(data) {
    try {
      const item = await this.model.create(data);
      if (item) {
        return new HttpResponse(item);
      }
      throw new Error("Something wrong happened");
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      return new HttpResponse(item);
    } catch (errors) {
      throw errors;
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);

      if (!item) {
        const error = new Error("Item not found");

        error.statusCode = 404;
        throw error;
      } else {
        return new HttpResponse(item, { deleted: true });
      }
    } catch (errors) {
      throw errors;
    }
  }
}

module.exports = { Service };
