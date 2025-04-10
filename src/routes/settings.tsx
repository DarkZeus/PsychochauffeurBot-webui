import React from 'react';
import {
  Save,
  Globe,
  Bell,
  Webhook,
  Bot,
  FileKey,
  Zap,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: Settings,
})

function Settings() {
    const [generalSettings, setGeneralSettings] = React.useState({
        botName: 'MyAwesomeBot',
        botUsername: 'my_awesome_bot',
        description: 'A powerful Telegram bot to help manage your community',
        language: 'en',
        timezone: 'UTC',
        commandPrefix: '/',
        baseURL: 'https://example.com/bot',
        maintenance: false
    });

    const [notificationSettings, setNotificationSettings] = React.useState({
        newUsers: true,
        userBlocked: true,
        errorNotifications: true,
        dailyReport: true,
        weeklyReport: true,
        alertEmail: 'admin@example.com',
        notifyInactivity: 7
    });

    const [apiSettings, setApiSettings] = React.useState({
        token: '5423782341:ABcDeFgHijKLmnoPQrsTUvWxYz12345678',
        webhookEnabled: true,
        webhookUrl: 'https://example.com/webhook/telegram',
        apiEndpoint: 'https://api.telegram.org',
        proxyEnabled: false,
        proxyUrl: '',
        pollingInterval: 1000,
        requestTimeout: 30000
    });

    const [savedState, setSavedState] = React.useState({
        general: true,
        notifications: true,
        api: true
    });

    const handleSaveGeneral = () => {
        // In a real app, this would send the updated settings to the backend
        console.log('Saving general settings:', generalSettings);
        setSavedState({...savedState, general: true});
    };

    const handleSaveNotifications = () => {
        // In a real app, this would send the updated notification settings to the backend
        console.log('Saving notification settings:', notificationSettings);
        setSavedState({...savedState, notifications: true});
    };

    const handleSaveApi = () => {
        // In a real app, this would send the updated API settings to the backend
        console.log('Saving API settings:', apiSettings);
        setSavedState({...savedState, api: true});
    };

    const handleResetBot = () => {
        // In a real app, this would trigger a bot restart
        alert('Bot reset requested. In a real implementation, this would restart the bot.');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Button variant="outline" onClick={handleResetBot}>
                    <RotateCw className="mr-2 h-4 w-4"/>
                    Reset Bot
                </Button>
            </div>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">
                        <Bot className="mr-2 h-4 w-4"/>
                        General
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4"/>
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="api">
                        <Webhook className="mr-2 h-4 w-4"/>
                        API & Integrations
                    </TabsTrigger>
                </TabsList>

                {/* General Settings Tab */}
                <TabsContent value="general" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>
                                Configure your bot's basic settings and behavior.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="botName">Bot Name</Label>
                                    <Input
                                        id="botName"
                                        value={generalSettings.botName}
                                        onChange={(e) => {
                                            setGeneralSettings({...generalSettings, botName: e.target.value});
                                            setSavedState({...savedState, general: false});
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="botUsername">Bot Username</Label>
                                    <div className="flex">
                                        <span
                                            className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 rounded-l-md border border-r-0 border-input">@</span>
                                        <Input
                                            id="botUsername"
                                            className="rounded-l-none"
                                            value={generalSettings.botUsername}
                                            onChange={(e) => {
                                                setGeneralSettings({...generalSettings, botUsername: e.target.value});
                                                setSavedState({...savedState, general: false});
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Bot Description</Label>
                                <Textarea
                                    id="description"
                                    value={generalSettings.description}
                                    onChange={(e) => {
                                        setGeneralSettings({...generalSettings, description: e.target.value});
                                        setSavedState({...savedState, general: false});
                                    }}
                                />
                                <p className="text-sm text-gray-500">
                                    This description will be shown when users first interact with your bot or view its
                                    info.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Default Language</Label>
                                    <Select
                                        value={generalSettings.language}
                                        onValueChange={(value) => {
                                            setGeneralSettings({...generalSettings, language: value});
                                            setSavedState({...savedState, general: false});
                                        }}
                                    >
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                            <SelectItem value="ru">Russian</SelectItem>
                                            <SelectItem value="zh">Chinese</SelectItem>
                                            <SelectItem value="ja">Japanese</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={generalSettings.timezone}
                                        onValueChange={(value) => {
                                            setGeneralSettings({...generalSettings, timezone: value});
                                            setSavedState({...savedState, general: false});
                                        }}
                                    >
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="America/New_York">America/New_York (EDT)</SelectItem>
                                            <SelectItem value="America/Los_Angeles">America/Los_Angeles
                                                (PDT)</SelectItem>
                                            <SelectItem value="Europe/London">Europe/London (BST)</SelectItem>
                                            <SelectItem value="Europe/Paris">Europe/Paris (CEST)</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                                            <SelectItem value="Australia/Sydney">Australia/Sydney (AEST)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="commandPrefix">Command Prefix</Label>
                                    <Input
                                        id="commandPrefix"
                                        value={generalSettings.commandPrefix}
                                        onChange={(e) => {
                                            setGeneralSettings({...generalSettings, commandPrefix: e.target.value});
                                            setSavedState({...savedState, general: false});
                                        }}
                                    />
                                    <p className="text-sm text-gray-500">
                                        Default: / (e.g., /start, /help)
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="baseURL">Base URL</Label>
                                    <Input
                                        id="baseURL"
                                        value={generalSettings.baseURL}
                                        onChange={(e) => {
                                            setGeneralSettings({...generalSettings, baseURL: e.target.value});
                                            setSavedState({...savedState, general: false});
                                        }}
                                    />
                                    <p className="text-sm text-gray-500">
                                        For generating links in your bot responses
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                    id="maintenance"
                                    checked={generalSettings.maintenance}
                                    onCheckedChange={(checked) => {
                                        setGeneralSettings({...generalSettings, maintenance: checked});
                                        setSavedState({...savedState, general: false});
                                    }}
                                />
                                <Label htmlFor="maintenance">Maintenance Mode</Label>
                                <Badge variant={generalSettings.maintenance ? "destructive" : "outline"}
                                       className="ml-2">
                                    {generalSettings.maintenance ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            {generalSettings.maintenance && (
                                <Alert className="mt-2">
                                    <AlertTitle>Maintenance Mode Active</AlertTitle>
                                    <AlertDescription>
                                        While in maintenance mode, your bot will only respond to administrator commands
                                        and will notify regular users that the bot is temporarily unavailable.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Reset</Button>
                            <Button
                                onClick={handleSaveGeneral}
                                disabled={savedState.general}
                            >
                                <Save className="mr-2 h-4 w-4"/>
                                {savedState.general ? "Saved" : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>
                                Configure how and when you receive notifications from your bot.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Bot Events</h3>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="newUsers"
                                            checked={notificationSettings.newUsers}
                                            onCheckedChange={(checked) => {
                                                setNotificationSettings({...notificationSettings, newUsers: checked});
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <Label htmlFor="newUsers">New User Registration</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="userBlocked"
                                            checked={notificationSettings.userBlocked}
                                            onCheckedChange={(checked) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    userBlocked: checked
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <Label htmlFor="userBlocked">User Blocked the Bot</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="errorNotifications"
                                            checked={notificationSettings.errorNotifications}
                                            onCheckedChange={(checked) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    errorNotifications: checked
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <Label htmlFor="errorNotifications">Error Notifications</Label>
                                    </div>
                                </div>
                            </div>

                            <Separator/>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Reports</h3>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="dailyReport"
                                            checked={notificationSettings.dailyReport}
                                            onCheckedChange={(checked) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    dailyReport: checked
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <Label htmlFor="dailyReport">Daily Activity Report</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="weeklyReport"
                                            checked={notificationSettings.weeklyReport}
                                            onCheckedChange={(checked) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    weeklyReport: checked
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <Label htmlFor="weeklyReport">Weekly Summary Report</Label>
                                    </div>
                                </div>
                            </div>

                            <Separator/>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Delivery</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="alertEmail">Alert Email</Label>
                                        <Input
                                            id="alertEmail"
                                            type="email"
                                            value={notificationSettings.alertEmail}
                                            onChange={(e) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    alertEmail: e.target.value
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <p className="text-sm text-gray-500">
                                            Email where important alerts will be sent
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notifyInactivity">Inactivity Threshold (days)</Label>
                                        <Input
                                            id="notifyInactivity"
                                            type="number"
                                            min="1"
                                            max="90"
                                            value={notificationSettings.notifyInactivity}
                                            onChange={(e) => {
                                                setNotificationSettings({
                                                    ...notificationSettings,
                                                    notifyInactivity: parseInt(e.target.value)
                                                });
                                                setSavedState({...savedState, notifications: false});
                                            }}
                                        />
                                        <p className="text-sm text-gray-500">
                                            Get notified when users are inactive for this many days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Reset</Button>
                            <Button
                                onClick={handleSaveNotifications}
                                disabled={savedState.notifications}
                            >
                                <Save className="mr-2 h-4 w-4"/>
                                {savedState.notifications ? "Saved" : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* API & Integrations Tab */}
                <TabsContent value="api" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Settings</CardTitle>
                            <CardDescription>
                                Configure API keys, webhook settings, and third-party integrations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="token">Telegram Bot Token</Label>
                                    <Badge variant="outline">Required</Badge>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="token"
                                        type="password"
                                        value={apiSettings.token}
                                        onChange={(e) => {
                                            setApiSettings({...apiSettings, token: e.target.value});
                                            setSavedState({...savedState, api: false});
                                        }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    You can get a token from <a href="https://t.me/BotFather"
                                                                className="text-blue-500 hover:underline"
                                                                target="_blank" rel="noreferrer">@BotFather</a> on
                                    Telegram
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="webhook">
                                    <AccordionTrigger className="text-base font-medium">
                                        <div className="flex items-center">
                                            <Webhook className="mr-2 h-4 w-4"/>
                                            Webhook Configuration
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pt-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="webhookEnabled"
                                                    checked={apiSettings.webhookEnabled}
                                                    onCheckedChange={(checked) => {
                                                        setApiSettings({...apiSettings, webhookEnabled: checked});
                                                        setSavedState({...savedState, api: false});
                                                    }}
                                                />
                                                <Label htmlFor="webhookEnabled">Enable Webhook</Label>
                                                <Badge variant={apiSettings.webhookEnabled ? "default" : "outline"}
                                                       className="ml-2">
                                                    {apiSettings.webhookEnabled ? "Enabled" : "Disabled"}
                                                </Badge>
                                            </div>

                                            {apiSettings.webhookEnabled ? (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                                                        <Input
                                                            id="webhookUrl"
                                                            value={apiSettings.webhookUrl}
                                                            onChange={(e) => {
                                                                setApiSettings({
                                                                    ...apiSettings,
                                                                    webhookUrl: e.target.value
                                                                });
                                                                setSavedState({...savedState, api: false});
                                                            }}
                                                        />
                                                        <p className="text-sm text-gray-500">
                                                            Must be HTTPS URL that is publicly accessible
                                                        </p>
                                                    </div>

                                                    <Alert>
                                                        <FileKey className="h-4 w-4"/>
                                                        <AlertTitle>SSL Required</AlertTitle>
                                                        <AlertDescription>
                                                            Telegram requires a valid SSL certificate for webhook URLs.
                                                            Self-signed certificates are not supported.
                                                        </AlertDescription>
                                                    </Alert>
                                                </>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Label htmlFor="pollingInterval">Polling Interval (ms)</Label>
                                                    <Input
                                                        id="pollingInterval"
                                                        type="number"
                                                        min="100"
                                                        step="100"
                                                        value={apiSettings.pollingInterval}
                                                        onChange={(e) => {
                                                            setApiSettings({
                                                                ...apiSettings,
                                                                pollingInterval: parseInt(e.target.value)
                                                            });
                                                            setSavedState({...savedState, api: false});
                                                        }}
                                                    />
                                                    <p className="text-sm text-gray-500">
                                                        How frequently to poll for updates when webhook is disabled
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="proxy">
                                    <AccordionTrigger className="text-base font-medium">
                                        <div className="flex items-center">
                                            <Globe className="mr-2 h-4 w-4"/>
                                            Proxy Settings
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pt-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="proxyEnabled"
                                                    checked={apiSettings.proxyEnabled}
                                                    onCheckedChange={(checked) => {
                                                        setApiSettings({...apiSettings, proxyEnabled: checked});
                                                        setSavedState({...savedState, api: false});
                                                    }}
                                                />
                                                <Label htmlFor="proxyEnabled">Use Proxy</Label>
                                            </div>

                                            {apiSettings.proxyEnabled && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="proxyUrl">Proxy URL</Label>
                                                    <Input
                                                        id="proxyUrl"
                                                        value={apiSettings.proxyUrl}
                                                        onChange={(e) => {
                                                            setApiSettings({...apiSettings, proxyUrl: e.target.value});
                                                            setSavedState({...savedState, api: false});
                                                        }}
                                                        placeholder="socks5://user:pass@host:port"
                                                    />
                                                    <p className="text-sm text-gray-500">
                                                        Supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxies
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="advanced">
                                    <AccordionTrigger className="text-base font-medium">
                                        <div className="flex items-center">
                                            <Zap className="mr-2 h-4 w-4"/>
                                            Advanced Settings
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-0 pt-4">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="apiEndpoint">API Endpoint</Label>
                                                <Input
                                                    id="apiEndpoint"
                                                    value={apiSettings.apiEndpoint}
                                                    onChange={(e) => {
                                                        setApiSettings({...apiSettings, apiEndpoint: e.target.value});
                                                        setSavedState({...savedState, api: false});
                                                    }}
                                                />
                                                <p className="text-sm text-gray-500">
                                                    Default: https://api.telegram.org
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="requestTimeout">Request Timeout (ms)</Label>
                                                <Input
                                                    id="requestTimeout"
                                                    type="number"
                                                    min="1000"
                                                    step="1000"
                                                    value={apiSettings.requestTimeout}
                                                    onChange={(e) => {
                                                        setApiSettings({
                                                            ...apiSettings,
                                                            requestTimeout: parseInt(e.target.value)
                                                        });
                                                        setSavedState({...savedState, api: false});
                                                    }}
                                                />
                                                <p className="text-sm text-gray-500">
                                                    Maximum time to wait for API responses
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Reset</Button>
                            <Button
                                onClick={handleSaveApi}
                                disabled={savedState.api}
                            >
                                <Save className="mr-2 h-4 w-4"/>
                                {savedState.api ? "Saved" : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
