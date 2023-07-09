const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  });

  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id).then((tagData) => {
    res.json(tagData);
  });
});
// find a single tag by its `id`
// be sure to include its associated Product data


router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});



// create a new tag

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        Tag.findAll({
          where: { tag_id: req.params.id }
        }).then((updateTags) => {
          // create filtered list of new tag_ids
          const tagIds = updateTags.map(({ tag_id }) => tag_id);
          const newTags = req.body.tagIds
            .filter((tag_id) => !tagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                tag_id: req.params.id,
                tag_id,
              };
            });

          const tagsToRemove = updateTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            Tag.destroy({ where: { id: tagsToRemove } }),
            Tag.bulkCreate(newTags),
          ]);
        });
      }
      return res.json(tag);

      // update a tag's name by its `id` value

    });
});
router.delete('/:id', (req, res) => {
  Tag.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});
// delete on tag by its `id` value

module.exports = router;
