import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from project.models import ToDo, Project
from user.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_of_project = graphene.Field(ToDoType, name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_project_by_id(root, info, id=None):
        if id:
            return Project.objects.get(id=id)
        return Project.objects.all()

    def resolve_todo_of_project(root, info, name=None):
        if name:
            return ToDo.objects.filter(project__name=name)
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        repository = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        project = Project.object.get(name=kwargs.get('name'))
        project.repository = kwargs.get('repository')
        project.save()
        return ProjectUpdateMutation(project=project)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        repository = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        project = Project.objects.create(**kwargs)
        return ProjectCreateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        repository = graphene.String()

    projects = graphene.List(ProjectType)

    @classmethod
    def mutate(cls, root, info,**kwargs):
        Project.objects.get(name=kwargs.get('name')).delete()
        return ProjectDeleteMutation(projects=Project.objects.all())


class Mutation(ObjectType):
    update_project = ProjectUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


# class ToDoUpdateMutation(graphene.Mutation):
#     class Arguments:
#         text = graphene.String(required=True)
#         project = graphene.Field(ToDoType, name=graphene.String(required=False))
#
#     todo = graphene.Field(ToDoType)
#
#     @classmethod
#     def mutate(cls, root, info, **kwargs):
#         todo = ToDo.object.get(name=kwargs.get('text'))
#         todo.repository = kwargs.get('project')
#         todo.save()
#         return ToDoUpdateMutation(todo=todo)
#
#
# class ToDotCreateMutation(graphene.Mutation):
#     class Arguments:
#         text = graphene.String(required=True)
#         project = graphene.Field(ToDoType, name=graphene.String(required=False))
#
#     todo = graphene.Field(ToDoType)
#
#     @classmethod
#     def mutate(cls, root, info, **kwargs):
#         todo = ToDo.objects.create(**kwargs)
#         return ToDoCreateMutation(todo=todo)
#
#
# class ToDoDeleteMutation(graphene.Mutation):
#     class Arguments:
#         text = graphene.String(required=True)
#         project = graphene.Field(ToDoType, name=graphene.String(required=False))
#
#     todos = graphene.Field(ToDoType)
#
#     @classmethod
#     def mutate(cls, root, info,**kwargs):
#         ToDo.objects.get(name=kwargs.get('text')).delete()
#         return ToDoDeleteMutation(todos=ToDo.objects.all())
#
#
# class Mutation(ObjectType):
#     update_todo = ToDoUpdateMutation.Field()
#     create_todo = ToDoCreateMutation.Field()
#     delete_todo = ToDoDeleteMutation.Field()


schema = graphene.Schema(mutation=Mutation)
