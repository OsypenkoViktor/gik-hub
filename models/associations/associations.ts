import Publication from "../Publication";
import PublicationTag from "../PublicationTag";
import ForumPost from "@/models/forumpost";
import ForumComment from "@/models/forumcomment";
import PublicationLike from "@/models/publicationLike";
import User from "@/models/User";
import ForumTag from "@/models/forumtag";
import ForumTheme from "@/models/forumtheme";

PublicationTag.belongsToMany(Publication, {
  through: "Publications_PublicationsTags",
  timestamps: false,
});
Publication.belongsToMany(PublicationTag, {
  through: "Publications_PublicationsTags",
  timestamps: false,
});

PublicationLike.belongsTo(User, { foreignKey: "userId" });
PublicationLike.belongsTo(Publication, { foreignKey: "publicationId" });

ForumPost.hasMany(ForumComment);
ForumComment.belongsTo(ForumPost);

ForumTag.hasMany(ForumTheme);
ForumTheme.belongsTo(ForumTag);

ForumTheme.hasMany(ForumPost);
ForumPost.belongsTo(ForumTheme);

export {
  Publication,
  PublicationTag,
  ForumPost,
  ForumComment,
  ForumTag,
  ForumTheme,
  PublicationLike,
};
