const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll().then((categoryData) => {
    res.json(categoryData);
  });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then((categoryData) => {
    res.json(categoryData);
  });

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        Category.findAll({
          where: { tag_id: req.params.id }
        }).then((updateCategory) => {
          // create filtered list of new tag_ids
          const categoryIds = updateCategory.map(({ category_id }) => category_id);
          const newCategory = req.body.tagIds
            .filter((category_id) => !categoryIds.includes(categoty_id))
            .map((category_id) => {
              return {
                category_id: req.params.id,
                category_id,
              };
            });

          const categoryToRemove = updatecategory
            .filter(({ category_id })
              (tag_id))
            .map(({ id }) => id);

          return Promise.all([
            Category.destroy({ where: { id: categoryToRemove } }),
            Category.bulkCreate(newCategory),
          ]);
        });
      }
      return res.json(category);

      // update a tag's name by its `id` value

    });
});
            // update a category by its `id` value

router.delete('/:id', (req, res) => {
  Category.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});





  // delete a category by its `id` value



module.exports = router;
