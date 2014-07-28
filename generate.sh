# 506  bumm app todo
# 510  bumm scaffold user name:string:required:true password:string:required:true email:string:required:true
# 511  bumm scaffold:rest post title:string:required:true content:string:required:true author:string:required:true created:date:required:true updated:date
# 512  bumm scaffold:rest post title:string:required:true content:string:required:true author:string:required:true created:date:required:true updated:date
# 519  sudo npm update -g bumm
# 521  npm help list bumm
# 523  bumm scaffold:rest post title:string:required:true content:string:required:true author:string:required:true
# 524  bumm -version
# 525  bumm scaffold:rest post title:string:required:true description
# 526  bumm scaffold:rest
# 528  bumm resource post title:string:required:true content:string:required:true author:string:required:true
# 545  bumm scaffold option name:string:required value
# 546  bumm scaffold option name:string:required:true value
# 547  bumm scaffold url name image target description rel
# 548  bumm scaffold term name:string:required:true slug
# 549  bumm scaffold TermTaxonomy term:ObjectId taxonomy:string description
# 550  bumm scaffold TermRelationship objectId:ObjectId termTaxonomyId:ObjectId
# 551  bumm scaffold comment author:string author.name:string author.email:string author.ip:string author.url:string created:date updated:date content:string user:ObjectId banned:Boolean
# 552  bumm scaffold post title url content excerpt comments:array author.id:ObjectId author.name:string created:date updated:date owner:ObjectId flag:string metas:array
# 554  bumm scaffold Link name image target description rel
# 555  bumm help
# 556  history | grep bumm


bumm scaffold user firstName:string:required:true lastName:string:required:true niceName:string:required:true displayName:string:required:true email:string:required:true password:string:required:true activationKey created:date:required:true updated:date:required:true status:number url

bumm scaffold comment authorName authorEmail authorIP authorUrl created:date:required:true updated:date:required:true content user:ObjectId banned:Boolean

bumm scaffold link target:string:required:true name image description rel

bumm scaffold option name:string:required:true value

bumm scaffold post authorId:ObjectId authorName title content excerpt url created:date:required:true updated:date:required:true metas:Array

bumm scaffold term name:string:required:true slug:string:required:true

bumm scaffold termtaxonomy term:ObjectId taxonomy:string:required:true description

bumm scaffold termrelationship objectId:ObjectId termTaxonomyId:ObjectId termOrder:Number




