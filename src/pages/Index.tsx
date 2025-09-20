import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  lastUpdated: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Основы работы с API",
    description: "Подробное руководство по интеграции с внешними API и обработке ответов",
    category: "Разработка",
    tags: ["API", "Backend", "Integration"],
    content: "Содержание статьи...",
    author: "Иван Петров",
    lastUpdated: "2024-03-15"
  },
  {
    id: 2,
    title: "Безопасность данных",
    description: "Лучшие практики защиты корпоративной информации и пользовательских данных",
    category: "Безопасность",
    tags: ["Security", "Data Protection", "GDPR"],
    content: "Содержание статьи...",
    author: "Анна Сидорова",
    lastUpdated: "2024-03-14"
  },
  {
    id: 3,
    title: "Управление проектами",
    description: "Методология Agile и Scrum в современной разработке программного обеспечения",
    category: "Менеджмент",
    tags: ["Agile", "Scrum", "Project Management"],
    content: "Содержание статьи...",
    author: "Михаил Козлов",
    lastUpdated: "2024-03-13"
  },
  {
    id: 4,
    title: "Оптимизация производительности",
    description: "Техники улучшения скорости работы веб-приложений и мобильных приложений",
    category: "Разработка",
    tags: ["Performance", "Optimization", "Web"],
    content: "Содержание статьи...",
    author: "Елена Волкова",
    lastUpdated: "2024-03-12"
  },
  {
    id: 5,
    title: "Корпоративные стандарты",
    description: "Документация по внутренним процессам и требованиям к качеству кода",
    category: "Документация",
    tags: ["Standards", "Code Quality", "Best Practices"],
    content: "Содержание статьи...",
    author: "Дмитрий Смирнов",
    lastUpdated: "2024-03-11"
  },
  {
    id: 6,
    title: "Работа с базами данных",
    description: "Проектирование схем баз данных и оптимизация SQL-запросов",
    category: "Разработка",
    tags: ["Database", "SQL", "Performance"],
    content: "Содержание статьи...",
    author: "Ольга Морозова",
    lastUpdated: "2024-03-10"
  }
];

const categories = ["Все", "Разработка", "Безопасность", "Менеджмент", "Документация"];
const allTags = Array.from(new Set(mockArticles.flatMap(article => article.tags)));

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || article.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">База знаний</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить статью
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Icon name="FolderOpen" size={20} className="mr-2" />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      <span className="ml-auto text-xs">
                        {category === "Все" 
                          ? mockArticles.length 
                          : mockArticles.filter(a => a.category === category).length
                        }
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Icon name="Tag" size={20} className="mr-2" />
                  Теги
                </CardTitle>
                <CardDescription>
                  Выберите теги для фильтрации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => setSelectedTags([])}
                  >
                    Очистить фильтры
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Всего статей</span>
                  <span className="font-semibold">{mockArticles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Найдено</span>
                  <span className="font-semibold text-primary">{filteredArticles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Категорий</span>
                  <span className="font-semibold">{categories.length - 1}</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedCategory === "Все" ? "Все статьи" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Найдено {filteredArticles.length} статей
                {selectedTags.length > 0 && (
                  <span> с тегами: {selectedTags.join(", ")}</span>
                )}
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">
                        {article.title}
                      </CardTitle>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {article.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Author and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Icon name="User" size={14} className="mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {new Date(article.lastUpdated).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Статьи не найдены
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить поисковый запрос или фильтры
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;